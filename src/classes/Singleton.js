class WeatherService {
	#apiKey;
	constructor() {
		if (WeatherService.instance) {
			return WeatherService.instance;
		}
		this.apiKey = 'b34c4bdc29be49a3bfb111938241905';
		WeatherService.instance = this;
	}

	async createApiRequest(city, type) {
		let result;
		switch(type) {
			case 'current':
				await fetch(`http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city}&aqi=no`)
					.then(response => response.json())
					.then(json => result = json);
				return result;
			case 'forecast':
				await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${city}&days=5&aqi=no&alerts=no`)
					.then(response => response.json())
					.then(json => result = json);
				return result;
			default:
				throw new Error('Unknown request type');
		}
	}
}

const instance = new WeatherService();
Object.freeze(instance);

export default instance;