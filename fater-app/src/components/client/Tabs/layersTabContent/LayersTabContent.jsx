import React, { Component } from "react";

import "./LayersTabContent.css";
import OverLayerList from "../OverLayerList/OverLayerList";
import BaseLayerList from "../BaseLayerList/BaseLayerList";

class LayersTabContent extends Component {
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
            <button className="btn btn-sm btn-primary">Add Map</button>
            <button className="btn btn-sm btn-primary">Add Layer</button>
          </div>
          <div id="LayersTabContent-items">
            <OverLayerList />
            <BaseLayerList />
          </div>
        </div>
      </>
    );
  }
}

export default LayersTabContent;
