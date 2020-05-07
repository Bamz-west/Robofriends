import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField, requestRobots } from '../actions.js';

const mapStateToProps = (state) => {
	return {
		searchField: state.searchRobots.searchField,
		isPending: state.requestRobots.isPending,
		robots: state.requestRobots.robots,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),  //This is a synchronous request which dispatches an action to a reducer
		onRequestRobots: () => dispatch(requestRobots())  // This is an asynchronous request which needs to return a function for the thunkMiddleware to act on it (thunkMiddleware is used for asynchronous requests)
	}	
}

class App extends Component {
	// constructor() {
	// 	super()
	// 	this.state = {
	// 		robots: []
	// 		// searchfield: ''
	// 	}
	// }

	componentDidMount() {
		// fetch('https://jsonplaceholder.typicode.com/users')
		// 	.then(response => response.json())
		// 	.then(users => this.setState({ robots : users }));
		this.props.onRequestRobots();
	}

	// onSearchChange(event) {
	// 	console.log(event.target.value);
	// }
	// When creating a function in a component, the above syntax will not work. Arrow functions have to be used like this:

	// Using Redux, we dont need the code below

	// onSearchChange = (event) => {
	// 	this.setState({searchfield: event.target.value});  //This ensures the searchfield is updated and overides the empty string in the constructor with what is written in the searchbox
	// }

	render() {
		// const { robots } = this.state;
		const { searchField, onSearchChange, robots, isPending } = this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})

		// removing the if else statement for better optimization

		// return !robots.length ?
		return isPending ?
		<h1>Loading...</h1> :
		(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchchange={ onSearchChange }/>
				<Scroll>
					<ErrorBoundry>
						<CardList robots={ filteredRobots }/>
					</ErrorBoundry>
				</Scroll>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);