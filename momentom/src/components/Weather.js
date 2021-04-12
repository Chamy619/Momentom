import React from 'react';

class Weather extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loc: '위치를 확인할 수 없습니다.'
        }

        this.getLocation = this.getLocation.bind(this);
    }

    getLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetch(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?input_coord=WGS84&output_coord=WGS84&y=${latitude}&x=${longitude}`, {
                    header: {
                        Authorization: 'KakaoAK d9a42fd2b9cf0e46f42c6d65a28d793b'
                    }
                })
                    .then(response => response.json())
                    .then(geoData => {
                        if (geoData.documents) {
                            this.setState({
                                loc: geoData.documents[1].address_name
                            });
                        }
                    })
                    .catch(error => {
                        console.log(`error: ${error}`);
                    });
            })
        }
    }

    componentDidMount() {
        this.getLocation();
        setInterval(this.getLocation(), 300000);
    }

    render() {
        return (
            <div className="weather">
                <span>
                    {this.state.loc} <br />
                    날씨 자리
                </span>
            </div>
        );
    }
}

export default Weather;