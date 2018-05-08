import React, { Component } from 'react';
import WeatherData from "./Weather/WeatherData";


class CarouselComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <div id="content-id-01" class="slds-carousel__panel" role="tabpanel" aria-hidden='false'>
        <a class="slds-carousel__panel-action slds-text-link_reset" tabIndex="0">
          <div class="slds-carousel__content">
            <h1 className='h1__title'> Current Weather </h1>
            <WeatherData
              name={this.props.name}
              id={this.props.id}
            />
          </div>
        </a>
      </div>
    )
  }

}

export default CarouselComp;