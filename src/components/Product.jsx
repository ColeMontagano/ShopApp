import React, { Component } from 'react'
import '../../src/App.css'
import axios from 'axios'
import { Container, Row, Col, Button, Table } from 'reactstrap'

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
			<Container>
				<h1 className="headerText">{this.state.item.name}</h1>
				<Row className="product">
					<Col sm="12" md="6" className=" container-fluid">
						<img className="itemImage" src={this.state.item.img} alt={this.state.item.name + 'picture'} />
					</Col>
					<Col sm="12" md="6" className="specList">
						<h4>Specs:</h4>
						<Table>
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
						</Table>
						<p>Price: ${item.price} </p>

						<Button
							color="dark"
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
						</Button>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Product
