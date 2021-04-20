import React from 'react';

import getApiKey from '../config.js';

import { WiCloud } from 'react-icons/wi';
import { WiDaySunny } from 'react-icons/wi';
import { WiRain } from 'react-icons/wi';

class Weather extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loc: '위치를 확인할 수 없습니다.',
            latitude: '',
            longitude: '',
            weather: '',
            temperature: ''
        }

        this.getLocation = this.getLocation.bind(this);
        this.getLocal = this.getLocal.bind(this);
        this.getWeather = this.getWeather.bind(this);
        this.getWeatherIcon = this.getWeatherIcon.bind(this);
    }

    getLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                this.setState({
                    latitude: latitude,
                    longitude: longitude
                });

                this.getLocal();
                this.getWeather();
            });
        }
    }

    getLocal() {
        const lat = this.state.latitude;
        const lon = this.state.longitude;
        const kakaoApiKey = getApiKey('kakao');
        fetch(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?input_coord=WGS84&output_coord=WGS84&y=${lat}&x=${lon}`, {
            headers: {
                'Authorization': `KakaoAK ${kakaoApiKey}`
            }
        })
            .then(response => response.json())
            .then(geoData => {
                if (geoData.documents) {
                    this.setState({
                        loc: geoData.documents[1].region_2depth_name
                    });
                }
            })
            .catch(error => {
                console.log(`error: ${error}`);
            });
    }

    getWeather() {
        const lat = this.state.latitude;
        const lon = this.state.longitude;
        const weatherApiKey = getApiKey('weather');
        if (lat && lon) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`)
                .then(response => response.json())
                .then(weatherData => {
                    this.setState({
                        weather: weatherData.weather[0].main,
                        temperature: weatherData.main.temp_min + '˚'
                    });
                })
                .catch(error => {
                    console.log(`error: ${error}`);
                });
        }
    }

    getWeatherIcon() {
        let weatherIcon = '';

        switch (this.state.weather) {
            case 'Cloud':
                weatherIcon = <WiCloud size={'2.5rem'} />;
                break;
            case 'Clear':
                weatherIcon = <WiDaySunny size={'2.5rem'} />;
                break;
            case 'Rain':
                weatherIcon = <WiRain size={'2.5rem'} />;
                break;
            default:
                weatherIcon = '';
                break;
        }

        return weatherIcon;
    }

    componentDidMount() {
        this.getLocation();
        setInterval(this.getLocation, 300000);
    }

    render() {
        let weather = this.getWeatherIcon();
        if (!weather) {
            weather = this.state.weather;
        }

        return (
            <div className="weather">
                <div>
                    {this.state.loc}
                </div>
                <div>
                    {weather} {this.state.temperature}
                </div>
            </div>
        );
    }
}

export default Weather;