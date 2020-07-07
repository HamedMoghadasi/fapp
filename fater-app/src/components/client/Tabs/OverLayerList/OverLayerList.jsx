import React, { Component } from "react";
import DragableLayerInfo from "../DragableLayerInfo/DragableLayerInfo";
import $ from "jquery";
import "jquery-ui-bundle";

import "./OverLayerList.css";
import TileLayer from "ol/layer/Tile";
import { Image as ImageLayer } from "ol/layer";
import VectorLayer from "ol/layer/Vector";

window.jQuery = $;
require("jquery-ui-touch-punch");

class OverLayerList extends Component {
  state = { map: "" };
  handle = () => {};

  componentDidMount() {
    setTimeout(() => {
      this.setState({ map: $("#mapContainer").data("map") });
    }, 1000);

    $("#overlayer-sortable-list").sortable({
      axis: "y",
      delay: 350,
      placeholder: "sortable-placeholder",
      update: function () {
        let layerOrder = $(this).sortable("toArray", {
          attribute: "data-oluid",
        });

        let map = $("#mapContainer").data("map");

        layerOrder
          .slice()
          .reverse()
          .forEach((ol_uid, index) => {
            map.getLayers().forEach((layer) => {
              if (layer.ol_uid === ol_uid) {
                layer.setZIndex((index + 1) * 100);
              }
            });
          });

        map.updateSize();
      },
    });
    $("#overlayer-sortable-list").disableSelection();
  }

  render() {
    if (this.state.map) {
      return (
        <>
          <div id="overlayer-container">
            <h6 onClick={this.handle}>لایه ها</h6>
            <ul id="overlayer-sortable-list">
              {this.state.map
                .getLayers()
                .array_.slice()
                .reverse()
                .map((layer, index) => {
                  if (
                    (layer instanceof VectorLayer ||
                      layer instanceof ImageLayer) &&
                    layer.get("name") !== "Draw vector layer"
                  ) {
                    console.log("layer :>> ", layer);
                    return (
                      <DragableLayerInfo
                        refreshComponent={this.props.refreshComponent}
                        key={index}
                        ol_uid={layer.ol_uid}
                        layer={layer}
                        invisible={
                          layer.values_.visible ? "" : "layer-invisible"
                        }
                      />
                    );
                  }
                })}
            </ul>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div id="overlayer-container">
            <h6 onClick={this.handle}>لایه ها</h6>
            <ul id="overlayer-sortable-list"></ul>
          </div>
        </>
      );
    }
  }
}

export default OverLayerList;
