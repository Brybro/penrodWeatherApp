/**
 * Retrieves four day forecast weather data for the correlating city
 */

import React, { Component } from 'react';
import ForecastDays from "./ForecastDays";

class ForecastData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      description: [],
      date: [],
      tempMin: [],
      tempMax: [],
      temp: [],
      icon: [],
    };
  }

  // Fetches the 5day/3hr forecast weather from the Weather API
  fetchData(){
    this.setState({ description: [], date: [], tempMin: [], tempMax: [], temp: [], icon: [] });
    const url = `https://api.openweathermap.org/data/2.5/forecast?id=${this.state.id}&APPID=d8de80775b6f0a42c495a503c9f01ac4`;
    fetch(url, {
    })
      .then(response => {
        if(response.status === 200) return response.json();
        else throw new Error("Something went wrong while fetching data");
      })
      .then(data => {
        data.list.map((forecastDay, index) => {
          if(index % 8 === 0) {
            this.convertDate(forecastDay.dt);
            this.addIcons(forecastDay.weather[0].icon);
            this.addMaxTemp(forecastDay.main.temp_max);
            this.addMinTemp(forecastDay.main.temp_min);
            this.addTemp(forecastDay.main.temp);
            this.addDescription(forecastDay.weather[0].description)
          }
        });
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
    if (nextProps.id !== this.props.id) {
      this.setState({ id: nextProps.id }, function () {
        this.fetchData();
      });
    }
    return true;
  }

  // Add forecast icon to the icon array
  addIcons(iconData){
    let iconArray = this.state.icon;
    let newIcon = iconArray.concat(iconData);
    this.setState({ icon: newIcon });
  }

  // Add forecast description to the desc array in the state
  addDescription(descData){
    let descArray = this.state.description;
    let newDesc = descArray.concat(this.capatilizeFirstLetter(descData));
    this.setState({ description: newDesc });
  }

  // Add forecast minimum temperature to the tempMin array in the state
  addMinTemp(minTempData){
    let minTempArray = this.state.tempMin;
    let newMinTemp = minTempArray.concat(this.convertTemperatureF(minTempData));
    this.setState({ tempMin: newMinTemp });
  }

  // Add forecast max temperature to the tempMax array in the state
  addMaxTemp(maxTempData){
    let maxTempArray = this.state.tempMax;
    let newMaxTemp = maxTempArray.concat(this.convertTemperatureF(maxTempData));
    this.setState({ tempMax: newMaxTemp });
  }

  // Add forecast temperature to the temp array in the state
  addTemp(tempData){
    let tempArray = this.state.temp;
    let newTemp = tempArray.concat(this.convertTemperatureF(tempData));
    this.setState({ temp: newTemp});
  }

  // Convert temp in Kelvin to Fahrenheit
  convertTemperatureF(temp){
    return Math.round((temp * (9 / 5)) - 459.67);
  }

  // Capitalize first letter of the description
  capatilizeFirstLetter(desc){
    return (desc.charAt(0).toUpperCase() + desc.substr(1));
  }

  // Convert unix date to local date
  convertDate(unixDate){
    let myDate = new Date( unixDate *1000);
    let day;
    myDate.toLocaleDateString();
    let dayNum = myDate.getDay();

      switch(dayNum){
        case 1:
          day = "Monday";
          break;
        case 2:
          day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
          break;
        default:
          day = "Sunday";
          break;
      }
    let dateArray = this.state.date;
    let newDate = dateArray.concat(day);
    this.setState({ date: newDate });
  }

  render() {
    const forecastDays = this.state.description.slice(1).map((desc, index) => (
        <div class="slds-col">
          <ForecastDays
            description={desc}
            date={this.state.date[index+1]}
            temp={this.state.temp[index+1]}
            tempMin={this.state.tempMin[index+1]}
            tempMax={this.state.tempMax[index+1]}
            icon={this.state.icon[index+1]}
          />
        </div>
    ));
    return (
      <div style={{ paddingTop: '2em'}}>
        <h1 className='h1__title'>Four Day Forecast</h1>
        <div class="slds-grid slds-grid_align-space" >
          {forecastDays}
        </div>
      </div>
    )
  }
}

export default ForecastData;
