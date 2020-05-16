import React, { Component } from "react";

import "./UpperToolbar.css";
import GoHome from "./GoHome/GoHome";
import Info from "./Info/Info";
import Capture from "./PhotoVideo/PhotoVideo";
import Share from "./Share/Share";
import Globe from "./Globe/Globe";

import $ from "jquery";

class UpperToolbar extends Component {
  componentDidMount = () => {
    $("#ut-container").on("click", "svg[data-toggle='collapse']", function () {
      const currentSvgTarget = $(this).data("target");
      console.log(currentSvgTarget);

      const activeCollapedId = $(".collapse.show").attr("id");
      if (activeCollapedId && currentSvgTarget !== `#${activeCollapedId}`) {
        $(`svg[data-target='#${activeCollapedId}']`)
          .attr("aria-expanded", "false")
          .addClass("collapsed");

        $(".collapse.show").removeClass("show");
      }
    });
  };

  render() {
    return (
      <>
        <div id="ut-container">
          <Share />
          <Globe />
          <Capture />
          <Info />
          <GoHome />
        </div>
      </>
    );
  }
}

export default UpperToolbar;
