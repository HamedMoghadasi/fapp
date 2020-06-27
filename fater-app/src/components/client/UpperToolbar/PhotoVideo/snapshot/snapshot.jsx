import React, { Component } from "react";
import $ from "jquery";

import "./snapshot.css";

class Snapshot extends Component {
  handleSnapshot = () => {
    const extension = $("#snapshot-extension")
      .children("option:selected")
      .val();
    const map = $("#mapContainer").data("map");
    map.once("rendercomplete", function () {
      var mapCanvas = document.createElement("canvas");
      console.log("mapCanvas :>> ", mapCanvas);
      var size = map.getSize();
      mapCanvas.width = size[0];
      mapCanvas.height = size[1];
      var mapContext = mapCanvas.getContext("2d");
      Array.prototype.forEach.call(
        document.querySelectorAll(".ol-layer canvas"),

        function (canvas) {
          if (canvas.width > 0) {
            var opacity = canvas.parentNode.style.opacity;
            mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);
            var transform = canvas.style.transform;
            // Get the transform parameters from the style's transform matrix
            var matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)[1]
              .split(",")
              .map(Number);

            // Apply the transform to the export map context
            CanvasRenderingContext2D.prototype.setTransform.apply(
              mapContext,
              matrix
            );
            mapContext.drawImage(canvas, 0, 0);
          }
        }
      );
      if (navigator.msSaveBlob) {
        // link download attribuute does not work on MS browsers
        navigator.msSaveBlob(
          mapCanvas.msToBlob(),
          `snapshot-${Date.now()}.${extension}`
        );
      } else {
        var link = document.getElementById("image-download");
        link.download = `snapshot-${Date.now()}.${extension}`;
        link.href = mapCanvas.toDataURL();
        link.click();
      }
    });
    map.renderSync();
  };

  render() {
    return (
      <div className="cropImage-wrapper">
        <select
          id="snapshot-extension"
          className="custom-select custom-select-sm"
        >
          <option value="png">png</option>
          <option value="jpg">jpg</option>
        </select>
        <button className="btn btn-danger btn-sm" onClick={this.handleSnapshot}>
          Snapshot
        </button>
        <a id="image-download"></a>
      </div>
    );
  }
}

export default Snapshot;
