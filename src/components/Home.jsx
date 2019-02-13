import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../src/App.css'
import { Container } from 'reactstrap'

class Home extends Component {
	render() {
		return (
			<Container className="noPadding">
				<div id="message">
					<h1>A Message to Shoppers</h1>
					<p>
						Ut dignissim cursus nisl, faucibus dignissim enim sodales at. Quisque aliquet orci quis enim
						consectetur, non auctor ante dapibus. Nulla rutrum sapien nulla, sit amet lobortis massa
						ultrices eget. Praesent quis tempor ligula, at commodo ante. Pellentesque ligula eros, lacinia
						ac eleifend sit amet, venenatis quis ex. Vivamus sit amet tellus egestas dui fermentum tincidunt
						in ut lorem. Integer massa massa, sodales vel laoreet nec, rutrum non lacus. Fusce bibendum
						scelerisque libero, ac molestie quam laoreet in. Praesent lacinia facilisis elit fringilla
						ullamcorper. <br /> - JDM Import Motors
					</p>
				</div>
				<Link to={'/shop'} className="btn btn-dark wideButton">
					Continue To The Store
				</Link>
			</Container>
		)
	}
}

export default Home
