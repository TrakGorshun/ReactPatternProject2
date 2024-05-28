import WeatherCard from './WeatherCard';
import Command from './Command';
import React, {Component} from 'react';
import countriesCities from '../citiesData/countries+cities.json';
import './Container.css';

class Container extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			data: null,
			searchTerm: ''
		}
	}

	handleUpdateItems = (newItems) => {
		this.setState({items: newItems.slice(0, 10)});
	};

	componentDidMount() {
		const result = countriesCities.find(({ name }) => name === "Latvia");
		if (result) {
			this.setState({ data: result.cities.map(city => city.name) });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { data } = this.state;
		if (data !== prevState.data) {
			const slicedCities = data.slice(0, 10);
			this.setState({ items: slicedCities });
		}
	}

	handleSearch = (event) => {
		this.setState({searchTerm: event.target.value});
		const filteredItems = this.state.data.filter(city =>
		  city.toLowerCase().includes(event.target.value.toLowerCase())
		).slice(0, 10);
		this.setState({items: filteredItems});
	};

	render() {
		return (
			<div style={{}}>
				<Command data={this.state.data} onUpdateTheme={this.props.onUpdateTheme}/>
				<input
				className='input'
				type="text"
				placeholder="Search..."
				value={this.state.searchTerm}
				onChange={this.handleSearch}
				/>
				<ul className='parent'>
						{ this.state.items ? this.state.items.map((item, index) => (
							<li className='child'>
								<WeatherCard city={item}/>
							</li>
						)) : <div>Loading...</div>}
				</ul>
			</div>
		);
	}
};

export default Container;