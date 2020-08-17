import React, { Component } from "react";
import $ from "jquery";
import gifshot from "gifshot";
import _ from "lodash";
import GIF from "gif.js.optimized";

import "./video.css";

class Video extends Component {
  state = { images: [], dates: [] };
  handleVideo = () => {
    const self = this;
    let selectedArea = document
      .getElementById("mediaAreaSelector-container")
      .getBoundingClientRect();

    // const extension = $("#video-extension").children("option:selected").val();
    const extension = "png";
    const map = $("#mapContainer").data("map");

    map.once("rendercomplete", function () {
      var mapCanvas = document.createElement("canvas");

      let currentDate = JSON.parse(window.sessionStorage.date);
      let currentDate_Timespan = new Date(
        currentDate.year,
        currentDate.month,
        currentDate.day,
        currentDate.hour
      ).getTime();

      mapCanvas.width = selectedArea.width;
      mapCanvas.height = selectedArea.height;
      var mapContext = mapCanvas.getContext("2d");
      Array.prototype.forEach.call(
        document.querySelectorAll(".ol-layer canvas"),

        function (canvas) {
          if (canvas.width > 0) {
            var opacity = canvas.parentNode.style.opacity;

            console.log("currentDate_Timespan :>> ", currentDate_Timespan);
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
                `${currentDate.year}-${currentDate.month}-${currentDate.day}  ${currentDate.hour}`,
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
          `video-${Date.now()}.${extension}`
        );
      } else {
        var link = document.getElementById("video-download");
        link.download = `video-${Date.now()}.${extension}`;
        link.href = mapCanvas.toDataURL();
        //console.log("link.href :>> ", link.href);
        // link.click();

        console.log("link.href :>> ", link.href);

        self.setState((state) => ({
          dates: [...self.state.dates, currentDate_Timespan],
        }));

        self.setState((state) => ({
          images: [...self.state.images, link.href],
        }));

        console.log("self.state.images :>> ", self.state.images);
      }
    });
    map.renderSync();
  };
  createGif = () => {
    let selectedArea = document
      .getElementById("mediaAreaSelector-container")
      .getBoundingClientRect();

    // console.log("umad tu create gif");
    // console.log("GIF : >> this.state.images :>> ", this.state.images);
    // gifshot.createGIF(
    //   {
    //     gifWidth:  selectedArea.width,
    //     gifHeight: selectedArea.height,
    //     images: this.state.images,
    //     interval: 1,
    //     numFrames: 10,
    //     frameDuration: 1,
    //     text: "",
    //     fontWeight: "normal",
    //     fontSize: "16px",
    //     fontFamily: "sans-serif",
    //     fontColor: "#ffffff",
    //     textAlign: "left",
    //     textBaseline: "bottom",
    //     sampleInterval: 10,
    //     numWorkers: 2,
    //   },
    //   function (obj) {
    //     if (!obj.error) {
    //       var image = obj.image,
    //         animatedImage = document.createElement("img");
    //       animatedImage.src = image;
    //       console.log("link :>> ", image);
    //       document.body.appendChild(animatedImage);
    //     }
    //   }
    // );
    var gif = new GIF({
      width: selectedArea.width,
      height: selectedArea.height,
      workers: 2,
      quality: 10,
    });
    this.state.images.map((image) => {
      console.log("umad umad");
      let animatedImage = document.createElement("img");
      animatedImage.src = image;
      // add an image element
      gif.addFrame(animatedImage);
    });

    gif.on("finished", function (blob) {
      alert();
      window.open(URL.createObjectURL(blob));
    });

    gif.render();
  };
  render() {
    return (
      <>
        <div className="cropVideo-wrapper">
          {/* <select
            id="video-extension"
            className="custom-select custom-select-sm"
          >
            <option value="png">mp4</option>
            <option value="jpg">mkv</option>
          </select> */}
          <button
            className="btn btn-danger btn-sm mt-3"
            onClick={() => {
              var i = 0;
              let handleVideo = this.handleVideo;
              let createGif = this.createGif;
              var timer = setInterval(function () {
                if (i === 15) {
                  createGif();
                  clearInterval(timer);
                }
                handleVideo();
                i++;
              }, 1500);
            }}
          >
            make a GIF
          </button>
          <a id="video-download"></a>
        </div>
      </>
    );
  }
}

export default Video;
