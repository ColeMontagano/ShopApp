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
				<div className="productBody">
					<h1 id="headerText">{this.state.item.name}</h1>
					<div className="row">
						<div className="col-md-6 col-sm-12 container-fluid">
							<img className="itemImage" src={this.state.item.img} />
						</div>
						<div className="col-md-6 col-sm-12 specList">
							<h4>Specs:</h4>
							<table>
								<tbody>
									<tr className="specItem">
										<td>Horsepower</td>
										<td>{item.hp}</td>
									</tr>
									<tr className="specItem">
										<td>Torque</td>
										<td>{item.tq}</td>
									</tr>
									<tr className="specItem">
										<td>Displacement</td>
										<td>{item.dp}cc</td>
									</tr>
								</tbody>
							</table>
							<p>Price: ${item.price} </p>

							<button
								className="btn btn-dark"
								onClick={() => {
									this.props.addToCart(
										item.name,
										item.make,
										item.price,
										item.img,
										item.description,
										item.id
									)
								}}>
								Add To Cart
							</button>
						</div>
					</div>
				</div>
				<hr />
			</div>
		)
	}
}

export default Product
