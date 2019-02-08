import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

class Shop extends Component {
	state = {
		shop      : [],
		cart      : [],
		loading   : true,
		cartTotal : 0
	}

	componentDidMount() {
		axios.get('http://localhost:8080/').then(({ data }) => {
			this.setState({
				shop      : data,
				cart      : data.cart,
				loading   : false,
				cartTotal : data.cartTotal
			})
		})
	}

	addToCart = (itemname, itemprice, itemimg, itemdescription) => {
		let item = {
			name        : itemname,
			price       : itemprice,
			img         : itemimg,
			description : itemdescription,
			inCart      : true
		}
		this.setState(
			{
				cart      : this.state.cart.concat({ item }),
				cartTotal : this.state.cartTotal + itemprice
			},
			() => {
				axios.post('http://localhost:8080/', { cart: this.state.cart, cartTotal: this.state.cartTotal })
			}
		)
	}

	removeFromCart = (itemname, itemprice) => {
		let foundItem = this.state.cart.findIndex((item) => item.item.name === itemname)
		let newCart = this.state.cart.filter((item, index) => {
			return foundItem !== index
		})
		this.setState(
			{
				cart      : newCart,
				cartTotal : this.state.cartTotal - itemprice
			},
			() => {
				axios.post('http://localhost:8080/', { cart: this.state.cart, cartTotal: this.state.cartTotal })
			}
		)
	}

	render() {
		return (
			<div className="container">
				<div className="shopbttns">
					<Link className="btn btn-dark col-6 shopbttns" to={this.props.match.url + '/Toyota'}>
						Toyota Motors
					</Link>
					<Link className="btn btn-dark col-6 shopbttns" to={this.props.match.url + '/Nissan'}>
						Nissan Motors
					</Link>
				</div>

				<Switch>
					<Route
						path={this.props.match.path + '/Nissan'}
						render={() => (
							<Nissan
								nissan={this.state.shop.nissan}
								addToCart={this.addToCart}
								loading={this.state.loading}
							/>
						)}
					/>
					<Route
						path={this.props.match.path + '/Toyota'}
						render={() => (
							<Toyota
								toyota={this.state.shop.toyota}
								addToCart={this.addToCart}
								loading={this.state.loading}
							/>
						)}
					/>
				</Switch>
				{this.state.cart.length > 0 && (
					<Cart
						cart={this.state.cart}
						cartTotal={this.state.cartTotal}
						removeFromCart={this.removeFromCart}
						loading={this.state.loading}
					/>
				)}
			</div>
		)
	}
}

const Nissan = (props) => {
	return (
		<div>
			{!props.loading &&
				props.nissan.map((nissan, i) => {
					return (
						<div key={i} style={{ display: 'inline-block' }}>
							<ItemCard item={nissan} addToCart={props.addToCart} />
						</div>
					)
				})}
			<hr />
		</div>
	)
}

const Toyota = (props) => {
	return (
		<div className="">
			{!props.loading &&
				props.toyota.map((toyota, i) => {
					return (
						<div key={i} style={{ display: 'inline-block' }}>
							<ItemCard item={toyota} addToCart={props.addToCart} />
						</div>
					)
				})}
			<hr />
		</div>
	)
}

const ItemCard = (props) => {
	return (
		<div className="card">
			<img className="card-img-top" src={props.item.img} alt="Motor" />
			<div className="card-body">
				<h5 className="card-title">{props.item.name}</h5>
				<p className="card-text">{props.item.description}</p>
				<p className="card-text">${props.item.price}</p>
				<button
					style={{
						display :
							props.item.inCart ? 'none' :
							'inline'
					}}
					className="btn btn-dark"
					onClick={() => {
						props.addToCart(
							props.item.name,
							props.item.price,
							props.item.img,
							props.item.description,
							props.item.inCart
						)
					}}>
					Add To Cart
				</button>
				<button
					style={{
						display :
							props.item.inCart ? 'inline' :
							'none'
					}}
					className="btn btn-dark"
					onClick={() => {
						props.removeFromCart(props.item.name, props.item.price)
					}}>
					Remove
				</button>
			</div>
		</div>
	)
}

class Cart extends Component {
	render() {
		return (
			<div>
				<h1>Shopping Cart</h1>
				{!this.props.loading &&
					this.props.cart.map((item, i) => {
						return (
							<div key={i} style={{ display: 'inline-block' }}>
								<ItemCard item={item.item} removeFromCart={this.props.removeFromCart} />
							</div>
						)
					})}
				{<h5>Cart Total: {this.props.cartTotal}</h5>}
			</div>
		)
	}
}

export default Shop
