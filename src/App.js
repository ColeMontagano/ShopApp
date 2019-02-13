import React, { Component } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import { Header, AppNavbar, Home, Shop, About, Product } from './components'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<AppNavbar />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/shop" component={Shop} />
					<Route path="/shop/:make/:id" render={(renderProps) => <Product renderProps={renderProps} />} />
					<Route path="/about" component={About} />
				</Switch>
			</div>
		)
	}
}

export default App
