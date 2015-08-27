var _ = require('lodash')
var classnames = require('classnames')
var CSSTransitionGroup = require('flatmarket/node_modules/react/addons').addons.CSSTransitionGroup
var React = require('flatmarket/node_modules/react')

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

    componentWillReceiveProps: function (nextProps) {
        if (!this.props.charge || (!this.props.charge.token && !nextProps.charge)) return
        this.setState({
            success: (this.props.charge.token && !nextProps.charge)
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
                    <h1>{this.props.schema.info.name}</h1>
                    <p><a href="https://github.com/christophercliff/flatmarket">Flatmarket</a> is a free, open source e-commerce platform for static websites. Its <a href="https://github.com/christophercliff/flatmarket#how-it-works">simple architecture</a> makes it extremely reliable, secure, and inexpensive to operate. View <a href="https://github.com/christophercliff/flatmarket">the source on GitHub</a>.</p>
                    <p>The platform uses <a href="https://stripe.com/">Stripe</a> for payment processing and is built on the latest web technologies like <a href="http://hapijs.com/">hapi</a>, <a href="http://facebook.github.io/react/">React</a>, and <a href="http://webpack.github.io/">Webpack</a>.</p>
                    <p>Right now you're looking at an example Flatmarket. When you're finished here, learn how to <a href="https://github.com/christophercliff/flatmarket#get-started">create your own</a>.</p>
                    <h5>Made possible by <a href="https://json.expert/">JSON Expert</a>, the easiest way to create a web-ready API</h5>
                </header>
                <main>
                    {_.map(this.props.schema.products, function (product, id) {
                        return (
                            <section key={id}>
                                <img src={_.first(product.images)} />
                                <a
                                    className={classnames({
                                        disabled: !canCreateCharge,
                                        charging: isCharging,
                                    })}
                                    href="#"
                                    onClick={_.bind(this.handleClickCheckout, this, id)}
                                >
                                    <div>{product.name} / {product.description}</div>
                                    <div className="cta">Buy now ${product.amount/100}</div>
                                </a>
                            </section>
                        )
                    }, this)}
                </main>
                <footer>
                    <p>This page is for demonstration only. Products are not for sale. Charges will not be processed and goods will not be delivered.</p>
                </footer>
                {(overlay) && (
                    <CSSTransitionGroup
                        transitionAppear={true}
                        transitionName="overlay"
                    >
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
                    </CSSTransitionGroup>
                )}
                {(process.env.PLATFORM !== 'browser') && (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: '<script>(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');ga(\'create\', \'UA-1582519-13\', \'auto\');ga(\'send\', \'pageview\');</script>'
                        }}
                    />
                )}
            </div>
        )
    },

})
