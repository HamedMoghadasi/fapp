import React, { Component } from "react";

import copy from "copy-to-clipboard";

import buildUrl from "build-url";
import $ from "jquery";

import "./UpperToolbar.css";
import GoHome from "./GoHome/GoHome";
import Info from "./Info/Info";
import PhotoVideo from "./PhotoVideo/PhotoVideo";
import Share from "./Share/Share";
import Globe from "./Globe/Globe";
let APP_URL = process.env.REACT_APP_URL;

class UpperToolbar extends Component {
  render() {
    return (
      <>
        <div id="ut-container">
          <Share />
          <Globe />
          <PhotoVideo />
          <Info />
          <GoHome />
        </div>
      </>
    );
  }
}

export default UpperToolbar;
