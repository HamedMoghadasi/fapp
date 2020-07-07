import React, { Component } from "react";

import "./LayersTabContent.css";
import OverLayerList from "../OverLayerList/OverLayerList";
import BaseLayerList from "../BaseLayerList/BaseLayerList";
import OverLayersModal from "../../modal/overLayers/overlayersModal";
import BaseLayersModal from "../../modal/baseLasyers/baselayersModal";

class LayersTabContent extends Component {
  state = { refresh: 0 };
  refreshComponent = () => {
    console.log("refresh called");
    this.setState((state) => ({
      refresh: state.refresh + 1,
    }));
    this.forceUpdate();
  };

  render() {
    return (
      <>
        <BaseLayersModal refreshComponent={this.refreshComponent} />
        <OverLayersModal refreshComponent={this.refreshComponent} />

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
            <BaseLayerList refreshComponent={this.refreshComponent} />
            <OverLayerList refreshComponent={this.refreshComponent} />
          </div>
        </div>
      </>
    );
  }
}

export default LayersTabContent;
