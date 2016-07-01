var _ = require('lodash')
var fromJS = require('immutable').fromJS

module.exports = function (actionMap, getInitialState) {
    actionMap = actionMap || {}
    getInitialState = getInitialState || getDefaultInitialState
    return function (state, action) {
        if (!state) state = getInitialState()
        return (actionMap[_.get(action, 'type')] || _.identity)(state, _.get(action, 'payload'))
    }
}

function getDefaultInitialState() {
    return fromJS({})
}
