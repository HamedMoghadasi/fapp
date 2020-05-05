import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";

class PhotoVideo extends Component {
  state = {};
  render() {
    return (
      <>
        <FontAwesomeIcon
          icon={faPhotoVideo}
          className="ut-icon"
          id="photoVideo"
        />
      </>
    );
  }
}

export default PhotoVideo;
