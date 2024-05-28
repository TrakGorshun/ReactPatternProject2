class WeatherApiAdapter {
	#apiData;
	constructor(apiData) {
		this.apiData = apiData;
	}

	getTemperature() {
		return this.apiData.current.temp_c;
	}

	getFTemperature() {
		return this.apiData.current.temp_f;
	}

	getMaxTemperature() {
		return this.apiData.temp || this.apiData.current.temp_c;
	}
	
	getMinTemperature() {
		return this.apiData.temp || this.apiData.current.temp_c;
	}

	getWind() {
		return this.apiData.current.wind_kph;
	}

	getCondition() {
		return this.apiData.current.condition.text;
	}

	getForecast() {
		return this.apiData.forecast;
	}

	getForecastDay() {
		return this.getForecast().forecastday;
	}

	getIcon() {
		return this.apiData.current.condition.icon;
	}

	getHumidity() {
		return this.apiData.current.humidity;
	}

	getPressure() {
		return this.apiData.current.pressure_mb;
	}

	getUV() {
		return this.apiData.current.uv;
	}
}

export default WeatherApiAdapter;