import React, { Component } from "react";
import DragableLayerInfo from "../DragableLayerInfo/DragableLayerInfo";
import $ from "jquery";
import "jquery-ui-bundle";

import "./OverLayerList.css";
import { Image as ImageLayer } from "ol/layer";
import VectorLayer from "ol/layer/Vector";
import _ from "lodash";
import { WindLayer } from "ol-wind";

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
    let map = $("#mapContainer").data("map");
    if (map) {
      let layers = map.getLayers().array_;
      var ordered = _.orderBy(layers, (layer) => layer.values_.zIndex, [
        "desc",
      ]);
      return (
        <>
          <div id="overlayer-container">
            <h6 onClick={this.handle}>لایه ها</h6>
            <ul id="overlayer-sortable-list">
              {ordered.map((layer, index) => {
                if (
                  (layer instanceof VectorLayer ||
                    layer instanceof WindLayer ||
                    layer instanceof ImageLayer) &&
                  layer.get("name") !== "Draw vector layer" &&
                  !layer.get("isTimelineLayer")
                ) {
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
