var entry = require('../lib/entry')

var SCHEMA = require('./fixtures/flatmarket.json')

describe('lib/entry', function () {

    describe('init()', function () {

        it('should render', function () {
            entry.init(SCHEMA, document.createElement('div'))
        })

    })

})
