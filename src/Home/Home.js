import React, { Component } from 'react';
import CarouselComp from "../CarouselComp";
import Header from "./Header";

const MILWAUKEE = 5263058;
const MINNEAPOLIS = 5037649;
const CHICAGO = 3582383;
const DALLAS = 4684888;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndexOne: 0,
      tabIndexTwo: -1,
      tabIndexThree: -1,
      tabIndexFour: -1,
      tabSelectedOne: true,
      tabSelectedTwo: false,
      tabSelectedThree: false,
      tabSelectedFour: false,
      classNameOne: "slds-carousel__indicator-action slds-is-active",
      classNameTwo: "slds-carousel__indicator-action",
      classNameThree: "slds-carousel__indicator-action",
      classNameFour:"slds-carousel__indicator-action",
      name: 'Milwaukee',
      id: MILWAUKEE,
    };

    this.toggleCarouselOne = this.toggleCarouselOne.bind(this);
    this.toggleCarouselTwo = this.toggleCarouselTwo.bind(this);
    this.toggleCarouselThree = this.toggleCarouselThree.bind(this);
    this.toggleCarouselFour = this.toggleCarouselFour.bind(this);
  }

  toggleCarouselOne() {
    this.setState({ tabIndexOne: 0, tabIndexTwo: -1, tabIndexThree: -1, tabIndexFour: -1,
      tabSelectedOne: true, tabSelectedTwo: false, tabSelectedThree: false, tabSelectedFour: false,
      name: 'Milwaukee', id: MILWAUKEE,
      classNameOne: "slds-carousel__indicator-action slds-is-active",
      classNameTwo: "slds-carousel__indicator-action",
      classNameThree: "slds-carousel__indicator-action",
      classNameFour: "slds-carousel__indicator-action",
    });
  }

  toggleCarouselTwo() {
    this.setState({ tabIndexOne: -1, tabIndexTwo: 0, tabIndexThree: -1, tabIndexFour: -1,
      tabSelectedOne: false, tabSelectedTwo: true, tabSelectedThree: false, tabSelectedFour: false,
      name: 'Minneapolis', id: MINNEAPOLIS,
      classNameOne: "slds-carousel__indicator-action",
      classNameTwo: "slds-carousel__indicator-action slds-is-active",
      classNameThree: "slds-carousel__indicator-action",
      classNameFour: "slds-carousel__indicator-action",
    });
  }

  toggleCarouselThree() {
    this.setState({ tabIndexOne: -1, tabIndexTwo: -1, tabIndexThree: 0, tabIndexFour: -1,
      tabSelectedOne: false, tabSelectedTwo: false, tabSelectedThree: true, tabSelectedFour: false,
      name: 'Dallas', id: DALLAS,
      classNameOne: "slds-carousel__indicator-action",
      classNameTwo: "slds-carousel__indicator-action",
      classNameThree: "slds-carousel__indicator-action slds-is-active",
      classNameFour: "slds-carousel__indicator-action",
    });
  }

  toggleCarouselFour() {
    this.setState({ tabIndexOne: -1, tabIndexTwo: -1, tabIndexThree: -1, tabIndexFour: 0,
      tabSelectedOne: false, tabSelectedTwo: false, tabSelectedThree: false, tabSelectedFour: true,
      name: 'Chicago', id: CHICAGO,
      classNameOne: "slds-carousel__indicator-action",
      classNameTwo: "slds-carousel__indicator-action",
      classNameThree: "slds-carousel__indicator-action",
      classNameFour: "slds-carousel__indicator-action slds-is-active"
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div class="slds-carousel">
          <h1 class="city__big"> {this.state.name} </h1>
          <div class="slds-carousel__stage">
            <CarouselComp
              name={this.state.name}
              image={this.state.image}
              id={this.state.id}
            />
          </div>
          <ul class="slds-carousel__indicators" role="tablist">
            <li class="slds-carousel__indicator" role="presentation">
                <a id="indicator-id-01" class={this.state.classNameOne}
                   role="tab"
                   onClick={this.toggleCarouselOne}
                   tabIndex={this.state.tabIndexOne}
                   aria-selected={this.state.tabSelectedOne}
                   aria-controls="content-id-01"
                   title="Milwaukee">
                  <span class="slds-assistive-text">Milwaukee</span>
                </a>
              </li>
              <li class="slds-carousel__indicator" role="presentation">
                <a id="indicator-id-02" class={this.state.classNameTwo}
                   role="tab"
                   onClick={this.toggleCarouselTwo}
                   tabIndex={this.state.tabIndexTwo}
                   aria-selected={this.state.tabSelectedTwo}
                   aria-controls="content-id-02"
                   title="Minneapolis">
                  <span class="slds-assistive-text">Minneapolis</span>
                </a>
              </li>
            <li class="slds-carousel__indicator" role="presentation">
              <a id="indicator-id-03" class={this.state.classNameThree}
                 role="tab"
                 onClick={this.toggleCarouselThree}
                 tabIndex={this.state.tabIndexThree}
                 aria-selected={this.state.tabSelectedThree}
                 title="Dallas">
                <span class="slds-assistive-text">Dallas</span>
              </a>
            </li>
            <li class="slds-carousel__indicator" role="presentation">
              <a id="indicator-id-04" class={this.state.classNameFour}
                 role="tab"
                 onClick={this.toggleCarouselFour}
                 tabIndex={this.state.tabIndexFour}
                 aria-selected={this.state.tabSelectedFour}
                 title="Chicago">
                <span class="slds-assistive-text">Chicago</span>
              </a>
            </li>
            </ul>
          </div>
      </div>
    );
  }

}

export default Home;