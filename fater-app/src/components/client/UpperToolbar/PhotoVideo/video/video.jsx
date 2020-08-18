import React, { Component } from "react";
import $ from "jquery";
import gifshot from "gifshot";
import _ from "lodash";
import GIF from "gif.js.optimized";

import "./video.css";

class Video extends Component {
  // state = { images: [], dates: [] };
  // reseteState = () => {
  //   this.setState((state) => ({
  //     dates: [],
  //   }));

  //   this.setState((state) => ({
  //     images: [],
  //   }));
  // };
  // handleVideo = () => {
  //   const self = this;
  //   let selectedArea = document
  //     .getElementById("mediaAreaSelector-container")
  //     .getBoundingClientRect();

  //   // const extension = $("#video-extension").children("option:selected").val();
  //   const extension = "png";
  //   const map = $("#mapContainer").data("map");

  //   map.once("rendercomplete", function () {
  //     var mapCanvas = document.createElement("canvas");

  //     let currentDate = JSON.parse(window.sessionStorage.date);
  //     let currentDate_Timespan = new Date(
  //       currentDate.year,
  //       currentDate.month,
  //       currentDate.day,
  //       currentDate.hour
  //     ).getTime();

  //     mapCanvas.width = selectedArea.width;
  //     mapCanvas.height = selectedArea.height;
  //     var mapContext = mapCanvas.getContext("2d");
  //     Array.prototype.forEach.call(
  //       document.querySelectorAll(".ol-layer canvas"),

  //       function (canvas) {
  //         if (canvas.width > 0) {
  //           var opacity = canvas.parentNode.style.opacity;

  //           console.log("currentDate_Timespan :>> ", currentDate_Timespan);
  //           mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);
  //           var transform = canvas.style.transform;
  //           // Get the transform parameters from the style's transform matrix
  //           var matrix = transform
  //             .match(/^matrix\(([^\(]*)\)$/)[1]
  //             .split(",")
  //             .map(Number);

  //           // Apply the transform to the export map context
  //           CanvasRenderingContext2D.prototype.setTransform.apply(
  //             mapContext,
  //             matrix
  //           );

  //           mapContext.drawImage(
  //             canvas,
  //             selectedArea.x,
  //             selectedArea.y,
  //             selectedArea.width,
  //             selectedArea.height,
  //             0,
  //             0,
  //             selectedArea.width,
  //             selectedArea.height
  //           );

  //           mapContext.font = "12px Arial";
  //           mapContext.fillStyle = "red";
  //           mapContext.fillText("Karaneh", 0, 15);
  //           if (currentDate) {
  //             mapContext.fillText(
  //               `${currentDate.year}-${currentDate.month}-${currentDate.day}  ${currentDate.hour}:00`,
  //               0,
  //               30
  //             );
  //           } else {
  //             mapContext.fillText(`${Date.now()}`, 0, 30);
  //           }
  //         }
  //       }
  //     );

  //     if (navigator.msSaveBlob) {
  //       // link download attribuute does not work on MS browsers
  //       navigator.msSaveBlob(
  //         mapCanvas.msToBlob(),
  //         `video-${Date.now()}.${extension}`
  //       );
  //     } else {
  //       // var link = document.getElementById("video-download");
  //       // link.download = `video-${Date.now()}.${extension}`;
  //       // link.href = mapCanvas.toDataURL();
  //       //console.log("link.href :>> ", link.href);
  //       // link.click();

  //       self.setState((state) => ({
  //         dates: [...self.state.dates, currentDate_Timespan],
  //       }));

  //       self.setState((state) => ({
  //         images: [...self.state.images, mapCanvas.toDataURL()],
  //       }));

  //       console.log("self.state.images :>> ", self.state.images);
  //     }
  //   });
  //   map.renderSync();
  // };
  // createGif = () => {
  //   const self = this;
  //   let selectedArea = document
  //     .getElementById("mediaAreaSelector-container")
  //     .getBoundingClientRect();

  //   gifshot.createGIF(
  //     {
  //       gifWidth: selectedArea.width,
  //       gifHeight: selectedArea.height,
  //       images: this.state.images,
  //       interval: 1,
  //       numFrames: 10,
  //       frameDuration: 1,
  //       text: "",
  //       fontWeight: "normal",
  //       fontSize: "16px",
  //       fontFamily: "sans-serif",
  //       fontColor: "#ffffff",
  //       textAlign: "left",
  //       textBaseline: "bottom",
  //       sampleInterval: 10,
  //       numWorkers: 2,
  //     },
  //     function (obj) {
  //       if (!obj.error) {
  //         if (document.getElementById("animationGifResult")) {
  //           document.getElementById("animationGifResult").remove();
  //         }

  //         var image = obj.image,
  //           animatedImage = document.createElement("a");
  //         animatedImage.href = image;
  //         animatedImage.download = `animationGif-${new Date().getTime()}.gif`;
  //         animatedImage.id = "animationGifResult";
  //         animatedImage.click();
  //         console.log("link :>> ", image);
  //         document.body.appendChild(animatedImage);
  //         self.reseteState();
  //       }
  //     }
  //   );
  // };

  // handleClick = () => {
  //   var i = 0;
  //   let handleVideo = this.handleVideo;
  //   let createGif = this.createGif;
  //   var timer = setInterval(function () {
  //     if (i === 15) {
  //       createGif();
  //       clearInterval(timer);
  //     }
  //     handleVideo();
  //     i++;
  //   }, 1500);
  // };

  dispatchRecordBtnClick = () => {
    document.getElementById("btn-timeline-recorder").click();
    console.log("create gif clicked");
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
            onClick={() => this.dispatchRecordBtnClick()}
          >
            make a GIF
          </button>
          {/* <a id="video-download"></a> */}
        </div>
      </>
    );
  }
}

export default Video;
