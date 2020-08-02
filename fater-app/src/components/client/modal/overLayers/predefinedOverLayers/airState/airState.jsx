import React, { Component } from "react";
import $ from "jquery";
import FirstSubList from "./sublists/first/first";
import SecondSubList from "./sublists/second/second";
import ThirdSubList from "./sublists/third/third";
import FourthSubList from "./sublists/fourth/fourth";

import "./airState.css";

class AirState extends Component {
  state = {};
  handleClick = (parentDOM, currentDOM) => {
    $(parentDOM).slideUp("fast");
    $(currentDOM).slideDown("fast");
  };

  render() {
    return (
      <>
        <FirstSubList refreshComponent={this.props.refreshComponent} />
        <SecondSubList refreshComponent={this.props.refreshComponent} />
        <ThirdSubList refreshComponent={this.props.refreshComponent} />
        <FourthSubList refreshComponent={this.props.refreshComponent} />

        <div className="airState-grid-container">
          <div
            className="airState-grid-container-item airState-grid-container-firstItem"
            onClick={() =>
              this.handleClick(".airState-grid-container", ".firstItem-sublist")
            }
          >
            <div className="airState-grid-container-Item-ImageWrapper airState-grid-container-firstItem-ImageWrapper"></div>
            <span className="airState-grid-container-title">
              پارامتر های هواشناسی
            </span>
          </div>
          <div
            className="airState-grid-container-item airState-grid-container-secondeItem"
            onClick={() =>
              this.handleClick(
                ".airState-grid-container",
                ".secondItem-sublist"
              )
            }
          >
            <div className="airState-grid-container-Item-ImageWrapper airState-grid-container-secondeItem-ImageWrapper"></div>
            <span className="airState-grid-container-title">
              پارامتر‌های کیفیت هوا
            </span>
          </div>
          <div
            className="airState-grid-container-item airState-grid-container-thirdItem"
            onClick={() =>
              this.handleClick(".airState-grid-container", ".thirdItem-sublist")
            }
          >
            <div className="airState-grid-container-Item-ImageWrapper airState-grid-container-thirdItem-ImageWrapper"></div>
            <span className="airState-grid-container-title">
              پارامترهای اقلیمی
            </span>
          </div>
          <div
            className="airState-grid-container-item airState-grid-container-fourthItem"
            onClick={() =>
              this.handleClick(
                ".airState-grid-container",
                ".fourthItem-sublist"
              )
            }
          >
            <div className="airState-grid-container-Item-ImageWrapper airState-grid-container-fourthItem-ImageWrapper"></div>
            <span className="airState-grid-container-title">رویداد</span>
          </div>
        </div>
      </>
    );
  }
}

export default AirState;
