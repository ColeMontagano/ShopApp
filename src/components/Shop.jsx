import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'
import Product from './Product'
import Cart from './Cart'
import { Button, Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, CardSubtitle } from 'reactstrap'

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
			<div>
				<Row id="shopNav">
					<Col id="noMargin" xs="6">
						<Link to={this.props.match.url + '/toyota'}>
							<Button outline className="wideButton">
							Toyota Motors
							</Button>
						</Link>
					</Col>
					<Col id="noMargin" xs="6">
						<Link to={this.props.match.url + '/nissan'}>
							<Button outline className="btn wideButton">
							Nissan Motors
							</Button>
						</Link>
					</Col>
				</Row>
				{!this.state.loading &&
				(this.props.location.pathname === '/shop' ||
					this.props.location.pathname === '/shop/toyota' ||
					this.props.location.pathname === '/shop/nissan')}
				<Container className="greyContainer noPadding center">
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
							ItemCard={this.ItemCard}
							props={this.props}
						/>
					)}
				</Container>
			</div>
		)
	}
}

const Nissan = (props) => {
	return (
		<div className="productList">
			{!props.loading &&
				props.nissan.map((nissan, i) => {
					return (
						<div key={i} style={{ display: 'inline-block' }}>
							<ItemCard item={nissan} addToCart={props.addToCart} url={props.url} />
						</div>
					)
				})}
		</div>
	)
}

const Toyota = (props) => {
	return (
		<div className="productList">
			{!props.loading &&
				props.toyota.map((toyota, i) => {
					return (
						<div key={i} style={{ display: 'inline-block' }}>
							<ItemCard item={toyota} addToCart={props.addToCart} url={props.url} />
						</div>
					)
				})}
		</div>
	)
}

const ItemCard = (props) => {
	let item = props.item
	return (
		<div>
			<Card>
				<Link to={{ pathname: `/shop/${item.make}/${item.id}`, state: { item } }}>
					<CardImg top src={item.img} alt="Motor" />
				</Link>
				<CardBody id="grey">
					<CardTitle>{item.name} </CardTitle>
					<CardSubtitle>{item.description}</CardSubtitle>
					<CardText>${item.price}</CardText>
					<Button
						outline
						style={{
							display :
								item.inCart ? 'none' :
								'inline'
						}}
						onClick={() => {
							props.addToCart(item.name, item.make, item.price, item.img, item.description, item.id)
						}}>
						Add To Cart
					</Button>
					<Button
						outline
						style={{
							display :
								item.inCart ? 'inline' :
								'none'
						}}
						onClick={() => {
							props.removeFromCart(item.name, item.price)
						}}>
						Remove
					</Button>
				</CardBody>
			</Card>
		</div>
	)
}
export default Shop
