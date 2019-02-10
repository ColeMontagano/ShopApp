import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'
import Product from './Product'

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

	addToCart = (itemname, itemmake, itemprice, itemimg, itemdescription, itemid) => {
		let item = {
			name        : itemname,
			make        : itemmake,
			price       : itemprice,
			img         : itemimg,
			description : itemdescription,
			id          : itemid,
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
					<Link className="btn btn-dark col-6 shopbttns" to={this.props.match.url + '/toyota'}>
						Toyota Motors
					</Link>
					<Link className="btn btn-dark col-6 shopbttns" to={this.props.match.url + '/nissan'}>
						Nissan Motors
					</Link>
				</div>

				<Switch>
					<Route
						path={'/shop/:make/:id'}
						render={(renderProps) => <Product addToCart={this.addToCart} renderProps={renderProps} />}
					/>
					<Route
						path={this.props.match.path + '/nissan'}
						render={() => (
							<Nissan
								nissan={this.state.shop.nissan}
								addToCart={this.addToCart}
								loading={this.state.loading}
								toProductPage={this.toProductPage}
								url={this.props.match.path + '/nissan'}
							/>
						)}
					/>
					<Route
						path={this.props.match.path + '/toyota'}
						render={() => (
							<Toyota
								toyota={this.state.shop.toyota}
								addToCart={this.addToCart}
								loading={this.state.loading}
								toProductPage={this.toProductPage}
								url={this.props.match.path + '/toyota'}
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
	console.log(props)
	return (
		<div>
			{!props.loading &&
				props.nissan.map((nissan, i) => {
					return (
						<div key={i} style={{ display: 'inline-block' }}>
							<ItemCard item={nissan} addToCart={props.addToCart} url={props.url} />
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
							<ItemCard item={toyota} addToCart={props.addToCart} url={props.url} />
						</div>
					)
				})}
			<hr />
		</div>
	)
}

const ItemCard = (props) => {
	let item = props.item
	console.log(item.make)
	return (
		<div className="card">
			<Link to={{ pathname: `/shop/${item.make}/${item.id}`, state: { item: item } }}>
				<img className="card-img-top" src={item.img} alt="Motor" />
			</Link>
			<div className="card-body">
				<h5 className="card-title">{item.name} </h5>
				<p className="card-text">{item.description}</p>
				<p className="card-text">${item.price}</p>
				<button
					style={{
						display :
							item.inCart ? 'none' :
							'inline'
					}}
					className="btn btn-dark"
					onClick={() => {
						props.addToCart(item.name, item.make, item.price, item.img, item.description, item.id)
					}}>
					Add To Cart
				</button>
				<button
					style={{
						display :
							item.inCart ? 'inline' :
							'none'
					}}
					className="btn btn-dark"
					onClick={() => {
						props.removeFromCart(item.name, item.price)
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
