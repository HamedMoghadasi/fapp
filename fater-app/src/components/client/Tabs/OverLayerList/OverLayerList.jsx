import React, { Component } from "react";
import DragableLayerInfo from "../DragableLayerInfo/DragableLayerInfo";
import $ from "jquery";
import "jquery-ui-bundle";

import "./OverLayerList.css";

window.jQuery = $;
require("jquery-ui-touch-punch");

class OverLayerList extends Component {
  componentDidMount() {
    $("#overlayer-sortable-list").sortable({
      axis: "y",
      delay: 350,
      placeholder: "sortable-placeholder",
    });
    $("#overlayer-sortable-list").disableSelection();
  }

  render() {
    return (
      <>
        <div id="overlayer-container">
          <h6>لایه ها</h6>
          <ul id="overlayer-sortable-list">
            <DragableLayerInfo
              name="draw layer"
              description="In this layer you drwa shapes"
            />
          </ul>
        </div>
      </>
    );
  }
}

export default OverLayerList;
