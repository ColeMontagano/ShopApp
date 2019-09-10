import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Form, Input, Button } from 'reactstrap'

class AppNavbar extends Component {
	constructor(props) {
		super(props)
		this.toggle = this.toggle.bind(this)
		this.state = {
			nameinput : '',
			name      : '',
			loggedIn  : false,
			isOpen    : false
		}
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
				<Nav>
					<NavbarBrand>Hello {this.state.name}</NavbarBrand>
					<NavItem>
						<Link to="/">
							<Button color="outline-success" onClick={this.logOut}>
								Log Out
							</Button>
						</Link>
					</NavItem>
				</Nav>
			)
		}
	}

	logIn = () => {
		if (!this.state.loggedIn) {
			return (
				<Form className="form-inline my-2 my-lg-0" onSubmit={this.addName}>
					<Input
						className="form-control mr-sm-12"
						onChange={(e) => this.getName(e.target.value)}
						type="text"
						placeholder="Name"
						required
					/>
					<Button color="outline-success">Sign In</Button>
				</Form>
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

	toggle() {
		this.setState({
			isOpen : !this.state.isOpen
		})
	}

	render() {
		return (
			<div className="sticky-top">
				<Navbar dark expand="md">
					<Link className="navLinks" to="/">
						Home
					</Link>
					<Nav>
						<NavItem>
							<Link className="navLinks" to="/shop">
								Shop
							</Link>
						</NavItem>
					</Nav>
					<Nav>
						<NavItem>
							<Link className="navLinks" to="/about">
								About Us
							</Link>
						</NavItem>
					</Nav>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								{this.logIn()}
								{this.retrieveName()}
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		)
	}
}

export default AppNavbar
