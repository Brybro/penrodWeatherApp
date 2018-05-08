import React, { Component } from 'react';
import ForecastDays from "./ForecastDays";

class ForecastData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      description: [],
      date: new Set(),
      tempMin: [],
      tempMax: [],
      temp: [],
      icon: [],
    };
  }

  fetchData(){
    this.setState({ description: [], date: new Set(), tempMin: [], tempMax: [], temp: [], icon: [] });
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

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({ id: nextProps.id }, function () {
        this.fetchData();
      });
    }
    return true;
  }

  addIcons(iconData){
    let iconArray = this.state.icon;
    let newIcon = iconArray.concat(iconData);
    this.setState({ icon: newIcon });
  }

  addDescription(descData){
    let descArray = this.state.description;
    let newDesc = descArray.concat(this.capatilizeFirstLetter(descData));
    this.setState({ description: newDesc });
  }

  addMinTemp(minTempData){
    let minTempArray = this.state.tempMin;
    let newMinTemp = minTempArray.concat(this.convertTemperatureF(minTempData));
    this.setState({ tempMin: newMinTemp });
  }

  addMaxTemp(maxTempData){
    let maxTempArray = this.state.tempMax;
    let newMaxTemp = maxTempArray.concat(this.convertTemperatureF(maxTempData));
    this.setState({ tempMax: newMaxTemp });
  }

  addTemp(tempData){
    let tempArray = this.state.temp;
    let newTemp = tempArray.concat(this.convertTemperatureF(tempData));
    this.setState({ temp: newTemp});
  }

  convertTemperatureF(temp, tempState){
    return Math.round((temp * (9 / 5)) - 459.67);
  }

  capatilizeFirstLetter(desc){
    return (desc.charAt(0).toUpperCase() + desc.substr(1));
  }

  convertDate(unixDate){
    let myDate = new Date( unixDate *1000);
    let today = new Date();
      let day;
      myDate.toLocaleDateString();

      switch(myDate.getDay()){
        case '1':
          day = "Monday";
          break;
        case '2':
          day = "Tuesday";
          break;
        case '3':
          day = "Wednesday";
          break;
        case '4':
          day = "Thursday";
          break;
        case '5':
          day = "Friday";
          break;
        case '6':
          day = "Saturday";
          break;
        default:
          day = "Sunday";
          break;
      }
      this.setState(({ date }) => ({
        date: new Set(date.add(myDate.getDay() + " " + myDate.getDate()))
      }));
  }

  render() {
    const forecastDays = this.state.description.slice(1).map((desc, index) => (
        <div class="slds-col">
          <ForecastDays
            description={desc}
            temp={this.state.temp[index]}
            tempMin={this.state.tempMin[index]}
            tempMax={this.state.tempMax[index]}
            icon={this.state.icon[index]}
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
