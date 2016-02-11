/* eslint global-require: 0 */
/* eslint no-process-env: 0 */
var _ = require('../flatmarket/node_modules/lodash')
var React = require('../flatmarket/node_modules/react')
var ReactCSSTransitionGroup = require('../flatmarket/node_modules/react-addons-css-transition-group')
var util = require('util')

if (process.env.PLATFORM === 'browser') require('./index.less')

module.exports = React.createClass({

    displayName: 'Index',
    propTypes: {
        charge: React.PropTypes.object,
        checkout: React.PropTypes.func,
        error: React.PropTypes.string,
        schema: React.PropTypes.object,
        status: React.PropTypes.string,
    },

    componentWillReceiveProps: function (next) {
        if (next.error && this.props.charge) this.setState({ errorSku: this.props.charge.get('sku') })
    },

    handleClick: function (id, e) {
        e.preventDefault()
        this.props.checkout(id)
    },

    render: function () {
        var name = this.props.schema.getIn([
            'info',
            'name',
        ])
        var description = this.props.schema.getIn([
            'info',
            'description',
        ])
        return (
            <div className="container">
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <header>
                    <h1>{name}</h1>
                    {!_.isEmpty(description) && <p>{description}</p>}
                </header>
                <main>
                    {this.props.schema.get('products').map(function (product, id) {
                        var statusClassName
                        if (!_.isEmpty(this.props.error) && id === _.get(this.state, 'errorSku')) {
                            statusClassName = 'error'
                        } else if (this.props.charge && id === this.props.charge.get('sku')) {
                            if (!_.isEmpty(this.props.charge.get('token'))) {
                                statusClassName = 'success'
                            } else {
                                statusClassName = 'checkout'
                            }
                        }
                        return (
                            <section
                                className={statusClassName}
                                key={id}
                                onClick={_.bind(this.handleClick, this, id)}
                            >
                                <div className="image" style={{
                                    backgroundImage: util.format('url(%s)', product.get('images').first()),
                                }} />
                                <div className="action">
                                    <div className="aligner">
                                        <div className="name">{product.get('name')}</div>
                                        <div className="description">{product.get('description')}</div>
                                    </div>
                                </div>
                                <div className="price">${product.get('amount') / 100}</div>
                                <div className="status status-checkout"><i className="material-icons">shopping_cart</i></div>
                                <div className="status status-success"><i className="material-icons">check_circle</i></div>
                                <div className="status status-error"><i className="material-icons">error</i></div>
                            </section>
                        )
                    }, this).toList()}
                </main>
                <footer>
                    <p><a href="https://github.com/christophercliff/flatmarket">Get Flatmarket</a></p>
                </footer>
                {(!_.isEmpty(this.props.error) && !document.body.setAttribute('style', 'overflow:hidden;')) && (
                    <ReactCSSTransitionGroup
                        transitionAppear
                        transitionAppearTimeout={500}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={200}
                        transitionName="aside"
                    >
                        <aside>
                            <div className="container">
                                <i className="material-icons icon-48">error</i>
                                <p>There was an error with your transaction. Reload the page and try again.</p>
                            </div>
                        </aside>
                    </ReactCSSTransitionGroup>
                )}
            </div>
        )
    },

})
