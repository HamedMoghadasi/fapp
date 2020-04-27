import React, { Component } from "react";

import "./LayersTabContent.css";

class LayersTabContent extends Component {
  state = {};
  render() {
    return (
      <>
        <div
          className="tab-pane fade show active"
          id="layers"
          role="tabpanel"
          aria-labelledby="layers-tab"
        >
          <div id="LayersTabContent-operators">
            <button className="btn btn-sm btn-info">Add Map</button>
            <button className="btn btn-sm btn-info">Add Layer</button>
          </div>
        </div>
      </>
    );
  }
}

export default LayersTabContent;
