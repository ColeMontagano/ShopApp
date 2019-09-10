import React, { Component } from 'react'
import '../../src/App.css'
import { Jumbotron } from 'reactstrap'
import ShopCarousel from './Carousel'

class Header extends Component {
	render() {
		return (
			<Jumbotron fluid id="jumbotron">
				<ShopCarousel fluid>
				<h1 className="headertext">JDM Import Motors</h1>
				<h4 className="headertext">Your #1 JDM Motor Supplier</h4>
				</ShopCarousel>
			</Jumbotron>
		)
	}
}

export default Header
