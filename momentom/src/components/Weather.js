import React from 'react';
import { WiCloud } from 'react-icons/wi';
import { WiDaySunny } from 'react-icons/wi';

class Weather extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loc: '위치를 확인할 수 없습니다.',
            latitude: '',
            longitude: '',
            weather: ''
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
        fetch(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?input_coord=WGS84&output_coord=WGS84&y=${lat}&x=${lon}`, {
            headers: {
                'Authorization': 'KakaoAK d9a42fd2b9cf0e46f42c6d65a28d793b'
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
        if (lat && lon) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cf94f6ea0c9b381575a0c1c2c9bb75b9&units=metric`)
                .then(response => response.json())
                .then(weatherData => {
                    this.setState({
                        weather: weatherData.weather[0].main
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
                weatherIcon = <WiCloud color={'white'} size={'100px'} />;
                break;
            case 'Clear':
                weatherIcon = <WiDaySunny color={'white'} size={'100px'} />;
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
                <span>
                    {this.state.loc} <br />
                    {weather}
                </span>
            </div>
        );
    }
}

export default Weather;