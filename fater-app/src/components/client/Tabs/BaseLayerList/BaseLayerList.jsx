import React, { Component } from "react";
import DragableLayerInfo from "../DragableLayerInfo/DragableLayerInfo";
import $ from "jquery";
import "jquery-ui-bundle";

import "./BaseLayerList.css";
import { layer } from "@fortawesome/fontawesome-svg-core";

class BaseLayerList extends Component {
  state = { map: "" };
  handle = () => {};

  componentDidMount() {
    setTimeout(() => {
      this.setState({ map: $("#mapContainer").data("map") });
    }, 1000);

    $("#baselayer-sortable-list").sortable({
      axis: "y",
      delay: 350,
      placeholder: "sortable-placeholder",
      update: function () {
        console.log("sort update");
        console.log($(this).sortable("toArray", { attribute: "data-oluid" }));
        // let layerOrder = $(this).sortable("toArray", {
        //   attribute: "data-oluid",
        // });

        // // let map = $("#mapContainer").data("map");

        // // let layers = [];
        // // layerOrder.map((ol_uid) => {
        // //   layers.push(
        // //     map
        // //       .getLayers()
        // //       .getArray()
        // //       .filter((layer) => layer.ol_uid === ol_uid)
        // //   );
        // // });
        // // console.log(layers);

        // // map.getLayers().array_ = map
        // //   .getLayers()
        // //   .getArray()
        // //   .filter((item) => item === -1);
        // // map.getLayers().array_ = layers;
        // // $("#mapContainer").data("map", map);

        //console.log(map.getLayers().array_);
      },
    });
    $("#baselayer-sortable-list").disableSelection();
  }

  render() {
    if (this.state.map) {
      return (
        <>
          <div id="baselayer-container">
            <h6 onClick={this.handle}>نقشه ها</h6>
            <ul id="baselayer-sortable-list">
              {this.state.map.getLayers().array_.map((item, index) => {
                return (
                  <DragableLayerInfo
                    key={index}
                    name={index}
                    ol_uid={item.ol_uid}
                    invisible={item.values_.visible ? "" : "layer-invisible"}
                    description={index}
                  />
                );
              })}
            </ul>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div id="baselayer-container">
            <h6 onClick={this.handle}>نقشه ها</h6>
            <ul id="baselayer-sortable-list"></ul>
          </div>
        </>
      );
    }
  }
}

export default BaseLayerList;
