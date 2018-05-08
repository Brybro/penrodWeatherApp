/**
 * Component that displays the four day forecast
 */

import React, { Component } from 'react';

class ForecastDays extends Component {

  render() {
    return (
        <div>
          <h2>{this.props.date}</h2>
          <h3 style={{ fontSize: '2.5em'}}>
            <img className = "weather__logo" src={`https://openweathermap.org/img/w/${this.props.icon}.png`} />
            {this.props.temp} °F
          </h3>
              <div>
                <h3>{this.props.description}</h3>
                <button class="slds-button" style={{ backgroundColor: '#1589ee'}}>{this.props.tempMin} °F</button>
                <button class="slds-button" style={{ backgroundColor: '#999900'}}>{this.props.tempMax} °F</button>
              </div>
        </div>
    );
  }

}

export default ForecastDays;