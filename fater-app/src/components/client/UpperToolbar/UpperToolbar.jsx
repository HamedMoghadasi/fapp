import React, { Component } from "react";

import "./UpperToolbar.css";
import GoHome from "./GoHome/GoHome";
import Info from "./Info/Info";
import PhotoVideo from "./PhotoVideo/PhotoVideo";
import Share from "./Share/Share";
import Globe from "./Globe/Globe";

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
