import React, { Component } from "react";
import $ from "jquery";
import FirstSubList from "./sublists/first/first";
import SecondSubList from "./sublists/second/second";
import ThirdSubList from "./sublists/third/third";
import FourthSubList from "./sublists/fourth/fourth";

import "./waterArea.css";

class WaterArea extends Component {
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

        <div className="waterArea-grid-container">
          <div
            className="waterArea-grid-container-item waterArea-grid-container-firstItem"
            onClick={() =>
              this.handleClick(
                ".waterArea-grid-container",
                ".firstItem-sublist"
              )
            }
          >
            <div className="waterArea-grid-container-Item-ImageWrapper waterArea-grid-container-firstItem-ImageWrapper"></div>
            <span className="waterArea-grid-container-title">
              پارامترهای کمی بدنه‌های آبی
            </span>
          </div>
          <div
            className="waterArea-grid-container-item waterArea-grid-container-secondeItem"
            onClick={() =>
              this.handleClick(
                ".waterArea-grid-container",
                ".secondItem-sublist"
              )
            }
          >
            <div className="waterArea-grid-container-Item-ImageWrapper waterArea-grid-container-secondeItem-ImageWrapper"></div>
            <span className="waterArea-grid-container-title">
              پارامترهای فیزیکی بدنه‌های آبی
            </span>
          </div>
          <div
            className="waterArea-grid-container-item waterArea-grid-container-thirdItem"
            onClick={() =>
              this.handleClick(
                ".waterArea-grid-container",
                ".thirdItem-sublist"
              )
            }
          >
            <div className="waterArea-grid-container-Item-ImageWrapper waterArea-grid-container-thirdItem-ImageWrapper"></div>
            <span className="waterArea-grid-container-title">
              پارامترهای کیفیت بدنه‌های آبی
            </span>
          </div>
          <div
            className="waterArea-grid-container-item waterArea-grid-container-fourthItem"
            onClick={() =>
              this.handleClick(
                ".waterArea-grid-container",
                ".fourthItem-sublist"
              )
            }
          >
            <div className="waterArea-grid-container-Item-ImageWrapper waterArea-grid-container-fourthItem-ImageWrapper"></div>
            <span className="waterArea-grid-container-title">رویداد</span>
          </div>
        </div>
      </>
    );
  }
}

export default WaterArea;
