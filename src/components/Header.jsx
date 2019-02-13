import React, { Component } from 'react'
import '../../src/App.css'
import { Jumbotron } from 'reactstrap'

class Header extends Component {
	render() {
		return (
			<Jumbotron fluid id="jumbotron">
				<h1 className="headertext">JDM Import Motors</h1>
				<h4 className="headertext">Your #1 JDM Motor Supplier</h4>
			</Jumbotron>
		)
	}
}

export default Header
