import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

class Info extends Component {
  state = {};
  render() {
    return (
      <>
        <FontAwesomeIcon icon={faInfoCircle} className="ut-icon" id="info" />
      </>
    );
  }
}

export default Info;
