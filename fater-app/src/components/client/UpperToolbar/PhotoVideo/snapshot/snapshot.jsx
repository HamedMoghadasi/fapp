import React, { Component } from "react";
import $ from "jquery";

import "./snapshot.css";

class Snapshot extends Component {
  handleSnapshot = () => {
    let selectedArea = document
      .getElementById("mediaAreaSelector-container")
      .getBoundingClientRect();

    const extension = $("#snapshot-extension")
      .children("option:selected")
      .val();
    const map = $("#mapContainer").data("map");

    map.once("rendercomplete", function () {
      var mapCanvas = document.createElement("canvas");
      mapCanvas.width = selectedArea.width;
      mapCanvas.height = selectedArea.height;
      var mapContext = mapCanvas.getContext("2d");
      Array.prototype.forEach.call(
        document.querySelectorAll(".ol-layer canvas"),

        function (canvas) {
          if (canvas.width > 0) {
            var opacity = canvas.parentNode.style.opacity;
            let currentDate = JSON.parse(window.sessionStorage.date);
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

            mapContext.drawImage(
              canvas,
              selectedArea.x,
              selectedArea.y,
              selectedArea.width,
              selectedArea.height,
              0,
              0,
              selectedArea.width,
              selectedArea.height
            );

            mapContext.font = "12px Arial";
            mapContext.fillStyle = "red";
            mapContext.fillText("Karaneh", 0, 15);
            if (currentDate) {
              mapContext.fillText(
                `${currentDate.year}-${currentDate.month}-${currentDate.day}  ${currentDate.hour}:00`,
                0,
                30
              );
            } else {
              mapContext.fillText(`${Date.now()}`, 0, 30);
            }
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
        //console.log("link.href :>> ", link.href);
        link.click();
      }
    });
    map.renderSync();
  };

  render() {
    return (
      <>
        <div className="cropImage-wrapper">
          <select
            id="snapshot-extension"
            className="custom-select custom-select-sm"
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
          </select>
          <hr />
          <button
            className="btn btn-danger btn-sm"
            onClick={this.handleSnapshot}
          >
            Take a snapshot
          </button>
          <a id="image-download"></a>
        </div>
      </>
    );
  }
}

export default Snapshot;
