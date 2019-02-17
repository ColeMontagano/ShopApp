import React, { Component } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { Button, Card, CardImg, CardBody, CardTitle, CardText, CardSubtitle } from 'reactstrap'

class Cart extends Component {
	state = {
		cartOpen : false
	}

	toggleCart = () => {
		this.setState({
			cartOpen : !this.state.cartOpen
		})
	}

	render() {
		return (
			<div>
				<Button color="dark" className="wideButton" onClick={this.toggleCart}>
					{
						this.state.cartOpen ? 'Close Cart' :
						'Open Cart'}
				</Button>

				{this.state.cartOpen && (
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
				)}
			</div>
		)
	}
}

const ItemCard = (props) => {
	let item = props.item
	return (
		<div>
			<Card>
				<Link to={{ pathname: `/shop/${item.make}/${item.id}`, state: { item } }}>
					<CardImg top src={item.img} alt="Motor" />
				</Link>
				<CardBody>
					<CardTitle>{item.name} </CardTitle>
					<CardSubtitle>{item.description}</CardSubtitle>
					<CardText>${item.price}</CardText>
					<Button
						color="dark"
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
						color="dark"
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

export default Cart
