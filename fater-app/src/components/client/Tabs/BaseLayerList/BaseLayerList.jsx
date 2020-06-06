import React, { Component } from "react";
import DragableLayerInfo from "../DragableLayerInfo/DragableLayerInfo";
import $ from "jquery";
import "jquery-ui-bundle";

import "./BaseLayerList.css";
import { layer } from "@fortawesome/fontawesome-svg-core";
import TileLayer from "ol/layer/Tile";

window.jQuery = $;
require("jquery-ui-touch-punch");

class BaseLayerList extends Component {
  state = { map: "" };
  handle = () => {};

  componentDidMount() {
    setTimeout(() => {
      this.setState({ map: $("#mapContainer").data("map") });
    }, 1000);
    console.log();

    $("#baselayer-sortable-list").sortable({
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
                layer.setZIndex((index + 1) * 10);
              }
            });
          });
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
              {this.state.map
                .getLayers()
                .array_.slice()
                .reverse()
                .map((layer, index) => {
                  if (layer instanceof TileLayer) {
                    return (
                      <DragableLayerInfo
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
