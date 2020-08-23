import React, { Component } from "react";
import $ from "jquery";
import gifshot from "gifshot";
import _ from "lodash";
import GIF from "gif.js.optimized";

import "./video.css";

class Video extends Component {
  // logic of animation gif is located in TimelinHOC.js file

  dispatchRecordBtnClick = () => {
    const mapContainer = $("#mapContainer").data("map");
    var i = 0;
    var timer = setInterval(function () {
      if (i === 5) {
        clearInterval(timer);
        document.getElementById("btn-timeline-recorder").click();
        console.log("create gif clicked");
      }
      mapContainer.updateSize();
      i++;
    }, 500);
  };
  render() {
    return (
      <>
        <div
          className="modal fade"
          id="animationGifModal"
          role="dialog"
          aria-labelledby="animationGifModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <h3>لورم ایپسوم متن ساختگی</h3>

                <p className="modal-message">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                </p>
                <div>
                  <img
                    src="./"
                    alt="first scene of gif"
                    id="animationGif-firstImageDom"
                  />
                </div>
                <a
                  href="./"
                  className="btn btn-sm btn-success m-3"
                  id="animationGifResult"
                >
                  download
                </a>
              </div>
            </div>
          </div>
        </div>

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
            Make a gif
          </button>
          {/* <a id="video-download"></a> */}
        </div>
      </>
    );
  }
}

export default Video;
