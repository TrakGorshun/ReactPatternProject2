import { Component } from "react";
import sortStrategies from "../classes/Strategy";
import './Command.css';

class Command extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedValue: '',
			selectedTheme: ''
		}
	}
	handleChange = (event) => {
		this.setState({selectedValue: event.target.value});
	};

	handleChangeTheme = (event) => {
		this.setState({selectedTheme: event.target.value});
		this.props.onUpdateTheme(event.target.value);
	};

	handleClick = (event) => {
		let newItems;

		switch (this.state.selectedValue) {
			case 'ascending':
				newItems = sortStrategies.execute(this.props.data, 'asc');
				break;
			case 'descending':
				newItems = sortStrategies.execute(this.props.data, 'desc');
				break;
			default:
				newItems = this.props.data;
		}
		this.props.onUpdateItems(newItems);
	};

	render() {
		return (
			<div className="center">
				<div>
					<label htmlFor="selectSort">Choose option</label>
					<select id="selectSort" value={this.state.selectedValue} onChange={this.handleChange}>
						<option value="ascending">Ascending</option>
						<option value="descending">Descending</option>
					</select>
					<button className="btn" onClick={this.handleClick}>Change list</button>
				</div>
				<select id="selectSort" style={{width: '80px', textAlign: 'center'}} value={this.state.selectedTheme} onChange={this.handleChangeTheme}>
						<option value="dark">Dark</option>
						<option value="light">Light</option>
					</select>
			</div>
		);
	}
}

export default Command;