import React, { Component } from "react";
import $ from "jquery";
import html2canvas from "html2canvas";
import htmlToImage from "html-to-image";
import RecordRTC from "recordrtc";

import "./AnimationGif.css";

class AnimationGif extends Component {
  state = {};

  componentDidMount = () => {
    setTimeout(() => {
      var elementToRecord = document.getElementById("canvasi");
      var canvas2d = document.getElementById("background-canvas");
      var context = canvas2d.getContext("2d");
      var tc_canvas = document.getElementById("tcanvas");
      console.log("tc_canvas :>> ", tc_canvas);
      var tc_context = tc_canvas.getContext("2d");
      console.log("tc_context :>> ", tc_context);
      var map_canvas = $("#mapContainer canvas")[0];
      console.log("map_canvas :>> ", map_canvas);

      canvas2d.width = elementToRecord.clientWidth;
      canvas2d.height = elementToRecord.clientHeight;

      var isRecordingStarted = false;
      var isStoppedRecording = false;
      let mapContainer = $("#mapContainer").data("map");

      (function looper() {
        console.log("isRecordingStarted :>> ", isRecordingStarted);
        if (!isRecordingStarted) {
          return setTimeout(looper, 10);
        }

        // htmlToImage
        //   .toCanvas(document.getElementById("canvasi"))
        //   .then(function (canvas) {
        //     console.log(canvas);
        //     context.clearRect(0, 0, canvas2d.width, canvas2d.height);
        //     context.drawImage(canvas, 0, 0, canvas2d.width, canvas2d.height);

        //     if (isStoppedRecording) {
        //       return;
        //     }

        //     requestAnimationFrame(looper);
        //   });
        console.log("tc_context :>> ", tc_context);
        console.log("map_canvas :>> ", map_canvas);
        tc_context.drawImage(map_canvas, 160, 160, 350, 350, 0, 0, 751, 751);
        requestAnimationFrame(looper);
      })();

      var recorder = new RecordRTC(tc_context, {
        type: "canvas",
      });

      document.getElementById("btn-start-recording").onclick = function () {
        document.getElementById("btn-stop-recording").disabled = false;
        // if (true) {
        //   let tc_canvas = document.getElementById("tcanvas");
        //   let tc_context = tc_canvas.getContext("2d");
        //   let map_canvas = $("#mapContainer canvas")[0];
        //   var i = 0;
        //   var timer = setInterval(function () {
        //     if (isStoppedRecording) clearInterval(timer);
        //     tc_context.drawImage(map_canvas, 160, 160, 350, 350, 0, 0, 751, 751);
        //     i++;
        //   }, 16.666);
        // }

        this.disabled = true;

        isStoppedRecording = false;
        isRecordingStarted = true;
        recorder.startRecording();
      };

      document.getElementById("btn-stop-recording").onclick = function () {
        this.disabled = true;
        document.getElementById("btn-start-recording").disabled = false;

        recorder.stopRecording(function () {
          isRecordingStarted = false;
          isStoppedRecording = true;
          console.log("stop e");
          var blob = recorder.getBlob();

          // document.getElementById('preview-video').srcObject = null;

          // document.getElementById("preview-video").src = URL.createObjectURL(blob);
          // document.getElementById("preview-video").parentNode.style.display =
          //   "block";

          //elementToRecord.style.display = "none";

          console.log(URL.createObjectURL(blob));
          window.open(URL.createObjectURL(blob));
        });
      };
    }, 2000);
  };

  render() {
    return (
      <>
        <button id="btn-start-recording">Start Recording</button>
        <button id="btn-stop-recording" disabled>
          Stop Recording
        </button>

        <hr />
        <div className="canvasi" id="canvasi">
          <div id="canvasi-title">Karaneh</div>
          <div id="canvasi-logo">
            <img src="./logo.jpg" alt="logo" />
          </div>
          <canvas id="tcanvas" width="751" height="751"></canvas>
        </div>

        <div id="video-element">
          <video controls autoPlay playsInline id="preview-video"></video>
        </div>

        <canvas id="background-canvas"></canvas>
      </>
    );
  }
}

export default AnimationGif;
