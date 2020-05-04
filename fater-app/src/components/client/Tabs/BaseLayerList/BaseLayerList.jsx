import React, { Component } from "react";
import DragableLayerInfo from "../DragableLayerInfo/DragableLayerInfo";
import $ from "jquery";
import "jquery-ui-bundle";

import "./BaseLayerList.css";

class BaseLayerList extends Component {
  componentDidMount() {
    $("#baselayer-sortable-list").sortable({
      axis: "y",
      delay: 350,
      placeholder: "sortable-placeholder",
    });
    $("#baselayer-sortable-list").disableSelection();
  }

  render() {
    return (
      <>
        <div id="baselayer-container">
          <h6>نقشه ها</h6>
          <ul id="baselayer-sortable-list">
            <DragableLayerInfo />
            <DragableLayerInfo />
            <DragableLayerInfo />
            <DragableLayerInfo />
            <DragableLayerInfo />
          </ul>
        </div>
      </>
    );
  }
}

export default BaseLayerList;
