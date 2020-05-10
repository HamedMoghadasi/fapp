import React, { Component } from "react";
import Map from "../components/map";
import { connect } from "react-redux";
import {
  updateCenterAndZoom,
  initialOpenLayersToState,
} from "../actions/map-action";

class MapContainer extends Component {
  UpdateCenterAndZoom = (center, zoom) => {
    this.props.dispatch(updateCenterAndZoom(center, zoom));
  };

  InitialOpenLayersToState = (olmap) => {
    this.props.dispatch(initialOpenLayersToState(olmap));
  };

  render() {
    return (
      <Map
        map={this.props.map}
        handleUpdatingCenterAndZoom={this.UpdateCenterAndZoom}
        initOpenLayers={this.InitialOpenLayersToState}
        location={this.props.location}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  map: state.map,
});
export default connect(mapStateToProps)(MapContainer);
