import React, { Component } from 'react';
import Container from './components/Container';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			theme: 'dark'
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.theme !== this.state.theme) {
			if (this.state.theme === 'dark') {
				document.body.style.backgroundColor = '#333';
				document.body.style.color = '#fff';
			}
			else {
				document.body.style.backgroundColor = '#fff';
				document.body.style.color = '#000';
			}
		}
	}

	updateTheme = (theme) => {
		this.setState({ theme });
	}

	render() {
		return (
			<div className='App'>
				<h1 style={{textAlign: 'center'}}>Weather report</h1>
				<Container onUpdateTheme={this.updateTheme} />
			</div>
		);
	}
}

export default App;