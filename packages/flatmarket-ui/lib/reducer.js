var _ = require('lodash')
var constants = require('./constants')
var createReducer = require('./create-reducer')
var Immutable = require('immutable')

var SHIPPING_ADDRESS_PREFIX = 'shipping_address_'
var SHIPPING_NAME_PREFIX = 'shipping_name'
var SHIPPING_ZIP = 'shipping_address_zip'
var SHIPPING_COUNTRY_CODE = 'shipping_address_country_code'
var TYPES = constants.types
var ERRORS = {
    chargeFailed: {
        id: 'charge_failed',
    },
    invalidSku: {
        id: 'invalid_sku',
    },
    invalidSchema: {
        id: 'invalid_schema',
    },
}

module.exports = createReducer(_.object([
    [TYPES.checkoutBegin.id, checkoutBegin],
    [TYPES.checkoutCancel.id, checkoutCancel],
    [TYPES.createChargeBegin.id, createChargeBegin],
    [TYPES.createChargeFailure.id, createChargeFailure],
    [TYPES.createChargeSuccess.id, createChargeSuccess],
    [TYPES.reset.id, reset],
]), function () {
    return Immutable.fromJS({
        charge: undefined,
        error: undefined,
        schema: undefined,
        status: undefined,
        stripePublishableKey: undefined,
    })
})

function checkoutBegin(state, sku) {
    var hasProduct = state.hasIn([
        'schema',
        'products',
        sku,
    ])
    if (!hasProduct) return state.set('error', ERRORS.invalidSku.id)
    return state.set('charge', Immutable.fromJS({
        sku: sku,
    }))
}

function checkoutCancel(state) {
    return state.set('charge', undefined)
}

function createChargeBegin(state, payload) {
    var needsShippingAddress = state.getIn([
        'schema',
        'products',
        payload.token.sku,
        'shippingAddress',
    ]) || state.getIn([
        'schema',
        'stripe',
        'shippingAddress',
    ])
    return state.withMutations(function (_state) {
        _state
            .setIn(['charge', 'email'], payload.token.email)
            .setIn(['charge', 'token'], payload.token.id)
        if (needsShippingAddress) {
            _.forEach(payload.addresses, function (val, key) {
                if (key.indexOf('shipping') < 0) return
                if (key === SHIPPING_COUNTRY_CODE) return
                if (key === SHIPPING_NAME_PREFIX) {
                    return _state.setIn([
                        'charge',
                        'shipping',
                        'name',
                    ], val)
                }
                var target = (key === SHIPPING_ZIP)
                    ? 'postal_code'
                    : key.replace(SHIPPING_ADDRESS_PREFIX, '')
                return _state.setIn([
                    'charge',
                    'shipping',
                    'address',
                    target,
                ], val)
            })
        }
        return _state
    })
}

function createChargeFailure(state) {
    return state
        .set('error', ERRORS.chargeFailed.id)
        .set('charge', undefined)
}

function createChargeSuccess(state) {
    return state.set('charge', undefined)
}

function reset(state, payload) {
    return module.exports()
        .set('schema', Immutable.fromJS(payload))
        .set('stripePublishableKey', _.get(payload, [
            'stripe',
            'publishableKey',
        ]))
}
