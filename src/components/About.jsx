import React, { Component } from 'react'
import Mapbox from './Mapbox'
import '../../src/App.css'

class About extends Component {
	render() {
		return (
			<div className="container">
				<h1 className="headerText">The Team</h1>
				<div className="row bio">
					<div className="col-12 col-md-6">
						<h4>Bill</h4>
						<h2>Picture</h2>
					</div>
					<div className="col-12 col-md-6">
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
				<div className="row">
					<div className="col-12 col-md-6">
						<h4>123 Thomas St</h4>
						<h4>Monroeville, PA</h4>
						<h4>81267</h4>
					</div>
					<div className="col-12 col-md-6 Map">
						<Mapbox />
					</div>
				</div>
			</div>
		)
	}
}

export default About
