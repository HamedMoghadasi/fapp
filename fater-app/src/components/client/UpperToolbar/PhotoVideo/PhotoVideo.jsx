import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhotoVideo,
  faCamera,
  faVideo,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";

import "./PhotoVideo.css";

class PhotoVideo extends Component {
  state = {};
  render() {
    return (
      <>
        <FontAwesomeIcon
          icon={faPhotoVideo}
          className="ut-icon"
          id="photoVideo"
          data-toggle="collapse"
          data-target="#photoVideo-container"
        />

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
                1
              </div>
              <div
                className="tab-pane fade"
                id="sreenCast"
                role="tabpanel"
                aria-labelledby="sreenCast-tab"
              >
                2
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
