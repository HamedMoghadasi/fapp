import React, { Component } from "react";

import "./UserTabContent.css";

class UserTabContent extends Component {
  state = {};
  render() {
    return (
      <div className="tabContainer">
        <div
          className="tab-pane fade"
          id="user"
          role="tabpanel"
          aria-labelledby="user-tab"
        >
          4
        </div>
      </div>
    );
  }
}

export default UserTabContent;
