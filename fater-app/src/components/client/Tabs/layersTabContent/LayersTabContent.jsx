import React, { Component } from "react";

import "./LayersTabContent.css";
import OverLayerList from "../OverLayerList/OverLayerList";
import BaseLayerList from "../BaseLayerList/BaseLayerList";
import OverLayersModal from "../../modal/overLayers/overlayersModal";
import BaseLayersModal from "../../modal/baseLasyers/baselayersModal";
import $ from "jquery";

class LayersTabContent extends Component {
  state = { refresh: 0 };
  refreshComponent = () => {
    console.log("refresh called");

    //refresh-timeLineLayers
    $("#timeline-refreshLayer-trigger").click();

    this.setState((state) => ({
      refresh: state.refresh + 1,
    }));
    this.forceUpdate();
  };

  toggleAllShownSlider = () => {
    var shownSliders = $(".sliderIsShown").toArray();
    var shownSliders_content = $(".sliderIsShown-content").toArray();

    shownSliders.forEach((item) => {
      $(item).toggle("opacity");
      $(item).removeClass("sliderIsShown");
    });

    shownSliders_content.forEach((item) => {
      $(item).toggle("opacity");
      $(item).removeClass("sliderIsShown-content");
    });
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
              onClick={this.toggleAllShownSlider}
            >
              نقشه جدید
            </button>
            <button
              className="btn btn-sm btn-primary"
              data-toggle="modal"
              data-target="#overLayersModal"
              onClick={this.toggleAllShownSlider}
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
