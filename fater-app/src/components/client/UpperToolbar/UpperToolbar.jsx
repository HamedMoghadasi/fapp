import React, { Component } from "react";

import "./UpperToolbar.css";
import GoHome from "./GoHome/GoHome";
import Info from "./Info/Info";
import Capture from "./PhotoVideo/PhotoVideo";
import Share from "./Share/Share";
import Search from "./Search/Search";
import MediaAreaSelector from "../MediaAreaSelector/MediaAreaSelector";

import $ from "jquery";

class UpperToolbar extends Component {
  componentDidMount = () => {
    $("#ut-container").on("click", "svg[data-toggle='collapse']", function () {
      const currentSvgTarget = $(this).data("target");
      console.log(currentSvgTarget);

      const activeCollapedId = $(".collapse.show").attr("id");
      console.log("activeCollapedId :>> ", activeCollapedId);
      if (activeCollapedId && currentSvgTarget !== `#${activeCollapedId}`) {
        $(`svg[data-target='#${activeCollapedId}']`)
          .attr("aria-expanded", "false")
          .addClass("collapsed");

        $(".collapse.show").removeClass("show");
        console.log(
          'activeCollapedId === "photoVideo-container" :>> ',
          activeCollapedId === "photoVideo-container"
        );
        if (activeCollapedId === "photoVideo-container") {
          $("#mediaAreaSelector-container").addClass("hide");
        }
      }
    });
  };

  render() {
    return (
      <>
        <div id="ut-container">
          <Search />
          <Share />
          <Capture />
          <Info />
          <GoHome />
          <MediaAreaSelector />
        </div>
      </>
    );
  }
}

export default UpperToolbar;
