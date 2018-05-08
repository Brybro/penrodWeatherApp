/**
 * Displays current weather data for the correlating city
 */

import React, { Component } from 'react';
import ForecastData from "./ForecastData";

class WeatherData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      description: '',
      temp: '',
      humidity: '',
      pressure: '',
      sunrise: '',
      sunset: '',
      windSpeed: '',
      icon: '',
    };
  }

  // Fetches the current weather from the Weather API
  fetchData(){
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${this.state.id}&APPID=d8de80775b6f0a42c495a503c9f01ac4`;
    fetch(url, {
    })
      .then(response => {
        if(response.status === 200) return response.json();
        else throw new Error("Something went wrong while fetching data");
      })
      .then(data => {
        this.capitalizeFirstLetter(data.weather[0].description);
        this.convertTemperatureF(data.main.temp);
        this.setState({humidity: data.main.humidity});
        this.convertSun("sunrise", data.sys.sunrise);
        this.convertSun("sunset", data.sys.sunset);
        this.convertWindMPH(data.wind.speed);
        this.setState({icon: data.weather[0].icon})
    }).catch((error) => {
        console.log(error)
    });
  }

  // Fetch data as soon as this component is initially created
  componentDidMount() {
    this.fetchData();
  }

  // Fetch new data anytime the props change
  componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      this.setState({ id: nextProps.id }, function () {
        this.fetchData();
    });
    }
  }

  // Convert sunrise and sunset unix time into standard time
  convertSun(sunName, sunPos){
    let myDate = new Date( sunPos *1000);
    let hours = myDate.getHours();
    let minutes = myDate.getMinutes();
    if(minutes < 10){
      minutes = "0" + minutes;
    }
    let time;
    myDate.toLocaleDateString();
    if(sunName === 'sunrise'){
      time = hours + ":" + minutes + " AM";
      this.setState({sunrise: time});
    }else{
      time = (hours - 12) + ":" + minutes + " PM";
      this.setState({sunset: time});
    }
  }

  // Capitalize first letter of the description
  capitalizeFirstLetter(desc){
    let capDesc = desc.charAt(0).toUpperCase() + desc.substr(1);
    this.setState({description: capDesc});
  }

  // Convert wind m/s to mph
  convertWindMPH(speed){
    let windSpeed = (speed * 2.2369);
    this.setState({windSpeed: Math.round(windSpeed)});
  }

  // Convert temp in Kelvin to Fahrenheit
  convertTemperatureF(temp){
    let fahrenheit = ((temp * (9/5)) - 459.67);
    this.setState({temp: Math.round(fahrenheit)});
  }

  render() {
    const image = `https://openweathermap.org/img/w/${this.state.icon}.png`;
    return (
      <div>
      <div class="slds-grid slds-wrap" style={{ paddingTop: '1em'}}>
        <div class="slds-col slds-size_1-of-4"/>
        <div class="slds-col slds-size_1-of-4">
          <h3 className='weather__temp'>
            <img className = "weather__logo" src={image} />
            {this.state.temp} °F
          </h3>
          <div>
            <b>{this.state.description}</b>
          </div>
        </div>
        <div class="slds-col slds-size_1-of-4">
          <div>
            <b>Humidity</b> = {this.state.humidity}% <br/>
            <b>Wind</b> = {this.state.windSpeed} mph <br/>
            <b>Sunrise</b> = {this.state.sunrise} <br/>
            <b>Sunset</b> = {this.state.sunset}
          </div>
        </div>
        <div class="slds-col slds-size_1-of-4"/>
      </div>
        <ForecastData
          id={this.state.id}
        />
      </div>
    );
  }
}

export default WeatherData;
