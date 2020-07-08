import React, { Component } from "react";
import DragableLayerInfo from "../DragableLayerInfo/DragableLayerInfo";
import $ from "jquery";
import "jquery-ui-bundle";

import "./BaseLayerList.css";
import TileLayer from "ol/layer/Tile";
import _ from "lodash";

window.jQuery = $;
require("jquery-ui-touch-punch");

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

        map.updateSize();
      },
    });
    $("#baselayer-sortable-list").disableSelection();
  }

  render() {
    let map = $("#mapContainer").data("map");
    if (map) {
      let layers = map.getLayers().array_;
      var ordered = _.orderBy(layers, (layer) => layer.values_.zIndex, [
        "desc",
      ]);
      return (
        <>
          <div id="baselayer-container">
            <h6 onClick={this.handle}>نقشه ها</h6>
            <ul id="baselayer-sortable-list">
              {ordered.map((layer, index) => {
                if (layer instanceof TileLayer) {
                  return (
                    <DragableLayerInfo
                      refreshComponent={this.props.refreshComponent}
                      key={index}
                      ol_uid={layer.ol_uid}
                      layer={layer}
                      invisible={layer.values_.visible ? "" : "layer-invisible"}
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
