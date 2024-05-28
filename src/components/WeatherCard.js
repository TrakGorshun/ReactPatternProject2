import instance from '../classes/Singleton';
import WeatherApiAdapter from '../classes/Adapter';
import React, {Component} from "react";
import './WeatherCard.css';

class WeatherCard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			weather: null,
			isOpenModal: false,
		};
	}

	fetchWeatherData = async (type) => {
		try {
			const response = await instance.createApiRequest(this.props.city, type);
			const result = new WeatherApiAdapter(response);
			this.setState({weather: result});
		} catch (error) {
			console.error("Error fetching weather data:", error);
		}
	};

	componentDidMount() {
		this.fetchWeatherData('current');
	}

	openModal = () => {
		this.fetchWeatherData('forecast');
		// console.log(this.state.weather);
		this.setState({isOpenModal: true});
	};

	closeModal = () => {
		this.setState({isOpenModal:false});
	};

	render() {
		return (
			<div>
				{this.state.isOpenModal && (
					<div className="weather-card-modal">
						<span className="close" onClick={this.closeModal}>&times;</span>
						{this.state.weather && (
							<div className="modal-content">
									<div className='modal-content-extra modal-content-column'>
										<div>Fahrenheit temp: {this.state.weather.getFTemperature()}</div>
										<div>Wind speed: {this.state.weather.getWind()} km/h</div>
										<div>Humidity: {this.state.weather.getHumidity()}%</div>
										<div>Pressure: {this.state.weather.getPressure()}mb</div>
										<div>UV index: {this.state.weather.getUV()}</div>
									</div>
									<div className='modal-content-main modal-content-column'>
										<div className='city-text'>City: {this.props.city}</div>
										<div>Current temp: {this.state.weather.getTemperature()}°C</div>
										<div className='city-condition'>
											<div>{this.state.weather.getCondition()}</div>
											<img src={this.state.weather.getIcon()} alt="icon" />
										</div>
									</div>
								<div className='modal-content-full-column'>
									<div className='modal-content-days-container'>
										{this.state.weather.getForecast() && this.state.weather.getForecastDay().map((day, key) => (
											<div className='day'>
												<div className='day-info'>
													<img src={day.day.condition.icon} alt="icon" />
													<div>{day.day.condition.text}</div>
												</div>
												<div className='day-temp-info'>
													<div>{day.day.maxtemp_c} °C</div>
													<div className=''>{day.day.mintemp_c} °C</div>
													<div className='date-text'>{day.date}</div>
												</div>
											</div>
										)
										)}
									</div>
								</div>
							</div>
						)}
					</div>
				)}
				<div onClick={this.openModal}>
					<div style={{fontSize: '20px', textAlign: 'right'}}>{this.props.city}</div>
					{this.state.weather ? (
						<div className='no-modal-info'>
							<div> {this.state.weather.getTemperature()} °C</div>
							<div>{this.state.weather.getCondition()} </div>
							<img src={this.state.weather.getIcon()} alt="icon" />
						</div>
					) : <div>Loading</div>} 
				</div>
			</div>
		);
	}
};

export default WeatherCard;