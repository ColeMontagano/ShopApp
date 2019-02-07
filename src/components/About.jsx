import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../src/App.css'

class About extends Component {
	render() {
		return (
			<div className="container">
				<h1>The Team</h1>
				<div className="row">
					<div className="col-2" />
					<div className="col-4">
						<h4>Bill</h4>
						<h2>Picture</h2>
					</div>
					<div className="col-4">
						<h3>A Word From Bill</h3>
						<p>
							Ut dignissim cursus nisl, faucibus dignissim enim sodales at. Quisque aliquet orci quis enim
							consectetur, non auctor ante dapibus. Nulla rutrum sapien nulla, sit amet lobortis massa
							ultrices eget. Praesent quis tempor ligula, at commodo ante. Pellentesque ligula eros,
							lacinia ac eleifend sit amet, venenatis quis ex
						</p>
					</div>
				</div>
				<hr />

				<h3>Where To Find Us</h3>
				<br />
				<div className="row" id="location">
					<div className="col-3" />
					<div className="col-4">Map</div>
					<div className="col-4">
						<p>3829 Hilly Dr</p>
						<p>North Ouitura, PA</p>
						<p>72940</p>
					</div>
				</div>
			</div>
		)
	}
}

export default About
