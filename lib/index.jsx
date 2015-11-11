/* eslint global-require: 0 */
/* eslint no-process-env: 0 */
var _ = require('lodash')
var classnames = require('classnames')
var Immutable = require('flatmarket/node_modules/immutable')
var React = require('flatmarket/node_modules/react')

if (process.env.PLATFORM === 'browser') require('./index.less')

module.exports = React.createClass({

    displayName: 'Index',
    propTypes: {
        charge: React.PropTypes.object,
        checkout: React.PropTypes.func,
        error: React.PropTypes.string,
        schema: React.PropTypes.instanceOf(Immutable.Map),
        status: React.PropTypes.string,
    },

    componentWillReceiveProps: function (nextProps) {
        if (!this.props.charge || (!this.props.charge.get('token') && !nextProps.charge)) return
        this.setState({
            success: (this.props.charge.get('token') && !nextProps.charge)
                ? 'Thanks for your order.'
                : 'Finishing up...',
        })
    },

    getInitialState: function () {
        return {
            success: undefined,
        }
    },

    handleClickCheckout: function (id, e) {
        e.preventDefault()
        this.props.checkout(id)
    },

    handleClickClose: function (e) {
        e.preventDefault()
        this.setState({
            success: undefined,
        })
    },

    render: function () {
        var canCreateCharge = !this.props.charge && !this.props.error
        var isCharging = !!this.props.charge
        var overlay
        if (this.props.error) {
            overlay = 'Oops, an error occurred.'
        } else if (this.state.success) {
            overlay = this.state.success
        }
        return (
            <div className="container">
                <header>
                    <h1>{this.props.schema.getIn([
                        'info',
                        'name',
                    ])}</h1>
                    <p>Flatmarket is a free, open source e-commerce platform for static websites. It is reliable, secure, and inexpensive to operate. <a href="https://github.com/christophercliff/flatmarket">View the source on GitHub</a>.</p>
                    <p>The platform uses <a href="https://stripe.com/">Stripe</a> for payment processing and is built on the latest web technologies like <a href="http://hapijs.com/">hapi</a>, <a href="http://facebook.github.io/react/">React</a>, and <a href="http://webpack.github.io/">Webpack</a>.</p>
                    <p>Right now you're looking at an example Flatmarket. When you're finished here, <a href="https://github.com/christophercliff/flatmarket#get-started">learn how to create your own</a>.</p>
                    <h5>Made possible by <a href="https://json.expert/">JSON Expert</a>, the easiest way to create a web-ready API</h5>
                </header>
                <main>
                    {this.props.schema.get('products').map(function (product, id) {
                        return (
                            <section key={id}>
                                <img src={product.getIn([
                                    'images',
                                    0,
                                ])} />
                                <a
                                    className={classnames({
                                        disabled: !canCreateCharge,
                                        charging: isCharging,
                                    })}
                                    href="#"
                                    onClick={_.bind(this.handleClickCheckout, this, id)}
                                >
                                    <div>{product.get('name')} / {product.get('description')}</div>
                                    <div className="cta">Buy now ${product.get('amount') / 100}</div>
                                </a>
                            </section>
                        )
                    }, this).toList()}
                </main>
                <footer>
                    <p>This page is for demonstration only. Products are not for sale. Charges will not be processed and goods will not be delivered.</p>
                </footer>
                {(overlay) && (
                    <aside key="overlay">
                        <div className="container">
                            <header>
                                <p>{overlay}</p>
                                <p><a
                                    href="#"
                                    onClick={_.bind(this.handleClickClose, this)}
                                >Close</a></p>
                            </header>
                        </div>
                    </aside>
                )}
            </div>
        )
    },

})
