import React, { Component } from 'react'
import '../../src/App.css'
import axios from 'axios'

class Product extends Component {
	state = {
		item : {}
	}

	componentDidMount() {
		axios
			.get(
				`http://localhost:8080/products/${this.props.renderProps.match.params.make}/${this.props.renderProps
					.match.params.id}`
			)
			.then(({ data }) => {
				this.setState({ item: data })
			})
	}

	componentDidUpdate() {
		// this.props.renderProps.location.state ? this.setState({
		// 	item : this.props.renderProps.location.state.item
		// }) :
		axios
			.get(
				`http://localhost:8080/products/${this.props.renderProps.match.params.make}/${this.props.renderProps
					.match.params.id}`
			)
			.then(({ data }) => {
				if (this.state.item.id !== data.id) {
					this.setState({ item: data })
				}
			})
	}
	render() {
		let item = this.state.item
		return (
			<div className="container">
				<h1>{this.state.item.name}</h1>
				<img className="itemImage" src={this.state.item.img} />
				<h4>Specs: </h4>
				<p>Horsepower: {item.hp} </p>
				<p>Torque: {item.tq} </p>
				<p>Displacement: {item.dp}cc </p>
				<p>Price: ${item.price} </p>
				<button
					className="btn btn-dark"
					onClick={() => {
						this.props.addToCart(item.name, item.make, item.price, item.img, item.description, item.id)
					}}>
					Add To Cart
				</button>
				<hr />
			</div>
		)
	}
}

export default Product
