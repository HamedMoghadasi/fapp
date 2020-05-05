import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAfrica } from "@fortawesome/free-solid-svg-icons";

class Globe extends Component {
  state = {};
  render() {
    return (
      <>
        <FontAwesomeIcon icon={faGlobeAfrica} className="ut-icon" id="glob" />
      </>
    );
  }
}

export default Globe;
