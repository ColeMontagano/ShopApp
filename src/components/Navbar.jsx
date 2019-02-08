import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Navbar extends Component {
	state = {
		nameinput : '',
		name      : '',
		loggedIn  : false
	}

	componentDidMount = () => {
		axios.get('http://localhost:8080/name').then(({ data }) => {
			if (data) {
				this.setState({
					name     : data,
					loggedIn : true
				})
			}
		})
	}

	retrieveName = () => {
		if (this.state.loggedIn) {
			return (
				<ul className="navbar-nav">
					<li className="nav-item navbar-brand">Hello {this.state.name}</li>
					<li className="nav-item">
						<Link to="/">
							<button className="btn btn-outline-success mr-sm-12" onClick={this.logOut}>
								Log Out
							</button>
						</Link>
					</li>
				</ul>
			)
		}
	}

	logIn = () => {
		if (!this.state.loggedIn) {
			return (
				<form className="form-inline my-2 my-lg-0" onSubmit={this.addName}>
					<input
						className="form-control mr-sm-12"
						onChange={(e) => this.getName(e.target.value)}
						type="text"
						placeholder="Name"
						required
					/>
					<button className="btn btn-outline-success my-2 my-sm-0">Sign In</button>
				</form>
			)
		}
	}

	getName = (nameinput) => {
		this.setState({
			nameinput
		})
	}

	addName = () => {
		this.state.nameinput &&
			this.setState(
				{
					name      : this.state.nameinput,
					loggedIn  : true,
					nameinput : ''
				},
				() => {
					axios.post('http://localhost:8080/name', { name: this.state.name })
				}
			)
	}

	logOut = () => {
		axios.post('http://localhost:8080/logout').then(() => {
			this.setState({
				loggedIn : false,
				name     : ''
			})
		})
	}

	render() {
		return (
			<div className="sticky-top">
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<Link className="navbar-brand" to="/">
						Home
					</Link>

					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link" to="/shop">
								Shop
							</Link>
						</li>
					</ul>
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link" to="/about">
								About Us
							</Link>
						</li>
					</ul>

					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav ml-auto">
							{this.logIn()}
							{this.retrieveName()}
						</ul>
					</div>
				</nav>
			</div>
		)
	}
}

export default Navbar
