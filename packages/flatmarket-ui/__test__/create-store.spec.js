/* global sinon */
var _ = require('lodash')
var actions = require('../lib/actions')
var createStore = require('../lib/create-store')
var expect = require('chai').expect
var getSubscribeHandler = require('./helper').getSubscribeHandler
var querystring = require('querystring')
var reducer = require('../lib/reducer')
var stripeCheckout = require('../lib/stripe-checkout')

var SCHEMA = require('./fixtures/flatmarket.json')
var RESPONSE_HEADERS = {
    'Content-Type': 'application/json',
}
var RESPONSES = {
    addresses: {
        billing_address_city: 'New York',
        billing_address_country: 'United States',
        billing_address_country_code: 'US',
        billing_address_line1: '123 Fake St',
        billing_address_state: 'NY',
        billing_address_zip: '10000',
        billing_name: 'John Doe',
        shipping_address_city: 'Racine',
        shipping_address_country: 'United States',
        shipping_address_country_code: 'US',
        shipping_address_line1: '123 Fake St',
        shipping_address_state: 'NY',
        shipping_address_zip: '10000',
        shipping_name: 'John Doe',
    },
    token: {
        email: 'test@email.com',
        id: 'tok_just_a_token',
    },
}

describe('lib/create-store', function () {
    var fakeServer
    var store
    var stripeStub
    var stripeStubCallbacks

    function getServer() {
        _.has(fakeServer, 'restore') && fakeServer.restore()
        fakeServer = sinon.fakeServer.create()
        fakeServer.autoRespond = true
        fakeServer.autoRespondAfter = 100
        return fakeServer
    }

    beforeEach(function () {
        store = createStore(reducer)
        stripeStub = sinon.stub(stripeCheckout, 'configure', function () {
            return {
                open: function (options) {
                    stripeStubCallbacks = _.pick(options, [
                        'closed',
                        'token',
                    ])
                },
            }
        })
        fakeServer = getServer()
    })

    afterEach(function () {
        getServer().restore()
        stripeStub.restore()
    })

    describe('reset()', function () {

        it('should reset', function () {
            store.dispatch(actions.reset(SCHEMA))
            expect(store.getState().get('schema').toJS()).to.deep.equal(SCHEMA)
            expect(store.getState().get('stripePublishableKey')).to.deep.equal('just_a_fake_key')
        })

    })

    describe('checkout()', function () {

        beforeEach(function () {
            store.dispatch(actions.reset(SCHEMA))
        })

        it('should checkout and cancel', function (done) {
            store.subscribe(getSubscribeHandler([
                function () {
                    expect(store.getState().getIn([
                        'charge',
                        'sku',
                    ])).to.equal('001')
                    stripeStubCallbacks.closed()
                },
                function () {
                    expect(store.getState().get('charge')).to.be.undefined
                },
            ], done))
            store.dispatch(actions.checkout('001'))
        })

        it('should checkout and create a charge', function (done) {
            store.subscribe(getSubscribeHandler([
                function () {
                    expect(store.getState().getIn([
                        'charge',
                        'sku',
                    ])).to.equal('001')
                    stripeStubCallbacks.token(RESPONSES.token, RESPONSES.addresses)
                },
                function () {
                    expect(store.getState().get('charge').toJS()).to.deep.equal({
                        email: 'test@email.com',
                        shipping: {
                            address: {
                                city: 'Racine',
                                country: 'United States',
                                line1: '123 Fake St',
                                state: 'NY',
                                postal_code: '10000',
                            },
                            name: 'John Doe',
                        },
                        sku: '001',
                        token: 'tok_just_a_token',
                    })
                    getServer().respondWith(function (fakeXHR) {
                        expect(fakeXHR.method).to.equal('POST')
                        expect(fakeXHR.url).to.equal('https://foo.com/')
                        expect(fakeXHR.requestHeaders['Content-Type']).to.equal('application/x-www-form-urlencoded;charset=utf-8')
                        expect(querystring.parse(fakeXHR.requestBody)).to.deep.equal({
                            email: 'test@email.com',
                            'shipping[address][city]': 'Racine',
                            'shipping[address][country]': 'United States',
                            'shipping[address][line1]': '123 Fake St',
                            'shipping[address][state]': 'NY',
                            'shipping[address][postal_code]': '10000',
                            'shipping[name]': 'John Doe',
                            sku: '001',
                            token: 'tok_just_a_token',
                        })
                        return fakeXHR.respond(200, RESPONSE_HEADERS, JSON.stringify({ status: 'ok' }))
                    })
                },
                function () {
                    expect(store.getState().get('charge')).to.be.undefined
                },
            ], done))
            store.dispatch(actions.checkout('001'))
        })

    })

})
