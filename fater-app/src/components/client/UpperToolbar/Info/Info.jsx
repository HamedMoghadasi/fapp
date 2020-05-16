import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import AboutUsModal from "../../modal/aboutUs/aboutUs";

class Info extends Component {
  state = {};
  render() {
    return (
      <>
        <AboutUsModal />
        <FontAwesomeIcon
          icon={faInfoCircle}
          className="ut-icon"
          id="info"
          title="Info"
          data-toggle="collapse"
          data-target="#InfoButton-container"
        />

        <div id="InfoButton-container" className="collapse">
          <ul>
            <li data-toggle="modal" data-target="#aboutUsModal">
              درباره ما
            </li>
            <li>تماس با ما</li>
            <li>گزارش خطا</li>
          </ul>
        </div>
      </>
    );
  }
}

export default Info;
