import React, { Component } from "react";

import "./LayersTabContent.css";
import OverLayerList from "../OverLayerList/OverLayerList";
import BaseLayerList from "../BaseLayerList/BaseLayerList";
import OverLayersModal from "../../modal/overLayers/overlayersModal";
import BaseLayersModal from "../../modal/baseLasyers/baselayersModal";

class LayersTabContent extends Component {
  render() {
    return (
      <>
        <BaseLayersModal />
        <OverLayersModal />

        <div
          className="tab-pane fade show active"
          id="layers"
          role="tabpanel"
          aria-labelledby="layers-tab"
        >
          <div id="LayersTabContent-operators">
            <button
              className="btn btn-sm btn-primary"
              data-toggle="modal"
              data-target="#baseLayersModal"
            >
              نقشه جدید
            </button>
            <button
              className="btn btn-sm btn-primary"
              data-toggle="modal"
              data-target="#overLayersModal"
            >
              لایه جدید
            </button>
          </div>
          <div id="LayersTabContent-items">
            <BaseLayerList />
            <OverLayerList />
          </div>
        </div>
      </>
    );
  }
}

export default LayersTabContent;
