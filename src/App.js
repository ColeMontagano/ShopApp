import React, { Component } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import { Home, Shop, Navbar, About } from './components'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Navbar />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/shop" component={Shop} />
					<Route path="/about" component={About} />
				</Switch>
			</div>
		)
	}
}

export default App
