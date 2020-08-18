import React, { Component } from "react";
import $ from "jquery";
import RecordRTC from "recordrtc";

import "./AnimationGif.css";

class AnimationGif extends Component {
  state = { refresh: new Date().getTime() };

  componentDidMount = () => {
    setTimeout(() => {
      document.getElementById("btn-start-recording").disabled = false;

      var _canvas = document.getElementById("tcanvas");
      var _context = _canvas.getContext("2d");
      var map_canvas = $("#mapContainer canvas")[0];
      const extension = $("#animationGif-extension")
        .children("option:selected")
        .val();

      var isRecordingStarted = false;
      var isStoppedRecording = false;

      const looper = () => {
        let selectedArea = document
          .getElementById("mediaAreaSelector-container")
          .getBoundingClientRect();

        document.getElementById("tcanvas").width = selectedArea.width;
        document.getElementById("tcanvas").height = selectedArea.height;

        if (isRecordingStarted) {
          console.log("map_canvas :>> ", map_canvas);
          _context.drawImage(
            map_canvas,
            selectedArea.x,
            selectedArea.y,
            selectedArea.width,
            selectedArea.height,
            0,
            0,
            selectedArea.width,
            selectedArea.height
          );
          requestAnimationFrame(looper);
        }
      };

      var recorder = new RecordRTC(_context, {
        type: "canvas",
      });

      document.getElementById("btn-start-recording").onclick = function () {
        document.getElementById("btn-stop-recording").hidden = false;

        this.hidden = true;

        isStoppedRecording = false;
        isRecordingStarted = true;
        looper();
        recorder.reset();
        recorder.startRecording();
      };

      document.getElementById("btn-stop-recording").onclick = function () {
        this.hidden = true;
        document.getElementById("btn-start-recording").hidden = false;

        recorder.stopRecording(function () {
          isRecordingStarted = false;
          isStoppedRecording = true;
          console.log("recorder :>> ", recorder);
          var blob = recorder.getBlob();
          //recorder.save(`animationGif-${new Date().getTime()}.${extension}`);

          // document.getElementById('preview-video').srcObject = null;

          // document.getElementById("preview-video").src = URL.createObjectURL(blob);
          // document.getElementById("preview-video").parentNode.style.display =
          //   "block";

          //elementToRecord.style.display = "none";

          window.open(URL.createObjectURL(blob));
        });
      };
    }, 2000);
  };

  render() {
    return (
      <>
        <div className="animationGif-wrapper">
          <select
            id="animationGif-extension"
            className="custom-select custom-select-sm"
          >
            <option value="mp4">MP4</option>
            <option value="mkv">MKV</option>
          </select>
          <hr />

          <button
            id="btn-start-recording"
            className="btn btn-success btn-sm"
            disabled
          >
            Start Recording
          </button>
          <button
            id="btn-stop-recording"
            className="btn btn-danger btn-sm"
            hidden
          >
            Stop Recording
          </button>

          <div className="canvasi" id="canvasi">
            <canvas id="tcanvas"></canvas>
          </div>

          <div id="video-element">
            <video controls autoPlay playsInline id="preview-video"></video>
          </div>

          <canvas id="background-canvas"></canvas>
        </div>
      </>
    );
  }
}

export default AnimationGif;
