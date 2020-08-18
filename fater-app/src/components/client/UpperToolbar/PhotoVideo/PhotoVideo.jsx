import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faVideo, faFilm } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";

import "./PhotoVideo.css";
import Snapshot from "./snapshot/snapshot";
import Video from "./video/video";
import AnimationGif from "./AnimationGif/AnimationGif";

class PhotoVideo extends Component {
  state = {};
  componentDidMount = () => {
    $("#photoVideo").on("click", function () {
      const wasClosed = $(this).attr("aria-expanded") === "false";
      if (wasClosed) {
        $("#mediaAreaSelector-container").removeClass("hide");
      } else {
        $("#mediaAreaSelector-container").addClass("hide");
      }
    });
  };
  render() {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xlink="http://www.w3.org/1999/xlink"
          preserveAspectRatio="none"
          x="0px"
          y="0px"
          width="32px"
          height="32px"
          viewBox="0 0 32 32"
          alt="capture icon"
          className="ut-icon"
          id="photoVideo"
          title="Media"
          data-toggle="collapse"
          data-target="#photoVideo-container"
          aria-expanded="false"
        >
          <defs>
            <g id="Layer1_0_FILL">
              <path
                fill="currentColor"
                stroke="none"
                d="
            M 149.4 -155.75
            L 149.85 -157.05
            Q 142.6 -153.3 134.45 -153.85 137.3 -150.5 141.6 -147.85 141.7 -147.8 141.8 -147.85 147.15 -150.25 149.4 -155.75
            M 150.15 -159
            L 150.15 -161.7
            Q 150 -166.65 146.3 -170.6 145.85 -162.6 141.3 -155.75 146.15 -156.6 150.15 -159
            M 129.3 -158.9
            Q 127.7 -154.25 127.7 -149.75 127.7 -149.55 127.8 -149.45 132.7 -145.95 138.7 -146.95
            L 139.7 -147.1
            Q 133.1 -151.45 129.3 -158.9
            M 122.35 -158.55
            Q 123.1 -154 126.2 -151.05 126.6 -159.05 131.15 -165.9 130.65 -165.75 130.05 -165.75 125.75 -164.55 122.35 -162.5 121.95 -161 122.35 -158.55
            M 130.9 -173.65
            L 130.7 -173.65
            Q 124.5 -170.8 122.7 -164.5 129.9 -168.25 138.1 -167.65 134.9 -171.4 130.9 -173.65
            M 134.05 -174.55
            L 132.75 -174.35
            Q 139.4 -170.1 143.15 -162.65 144.8 -167.15 144.8 -172 142.95 -173.25 141.25 -173.85 137.45 -175.15 134.05 -174.55 Z"
              />
            </g>
          </defs>

          <g transform="matrix( 1.0714263916015625, 0, 0, 1.0713653564453125, -129.85,188.2) ">
            <use xlinkHref="#Layer1_0_FILL" />
          </g>
        </svg>

        <div id="photoVideo-container" className="collapse">
          <div id="photoVideo-wrapper">
            <ul
              className="nav nav-tabs nav-justified"
              id="pv-tab"
              role="tablist"
            >
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="cropImage-tab"
                  data-toggle="tab"
                  href="#cropImage"
                  role="tab"
                  aria-controls="cropImage"
                  aria-selected="true"
                >
                  <FontAwesomeIcon icon={faCamera} />
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="sreenCast-tab"
                  data-toggle="tab"
                  href="#sreenCast"
                  role="tab"
                  aria-controls="sreenCast"
                  aria-selected="false"
                >
                  <FontAwesomeIcon icon={faVideo} />
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="makeAnimation-tab"
                  data-toggle="tab"
                  href="#makeAnimation"
                  role="tab"
                  aria-controls="makeAnimation"
                  aria-selected="false"
                >
                  <FontAwesomeIcon icon={faFilm} />
                </a>
              </li>
            </ul>
            <div className="tab-content" id="pv-tab-content">
              <div
                className="tab-pane fade show active"
                id="cropImage"
                role="tabpanel"
                aria-labelledby="cropImage-tab"
              >
                <Snapshot />
              </div>
              <div
                className="tab-pane fade"
                id="sreenCast"
                role="tabpanel"
                aria-labelledby="sreenCast-tab"
              >
                {/* <Video /> */}
                <AnimationGif />
              </div>
              <div
                className="tab-pane fade"
                id="makeAnimation"
                role="tabpanel"
                aria-labelledby="makeAnimation-tab"
              >
                3
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PhotoVideo;
