import { projections } from "../constants/projections";
import {
  UPDATE_CENTER_AND_ZOOM,
  INITIAL_OPENLAYERS_MAP,
} from "../actions/map-action";
import * as OlProj from "ol/proj";

const initialState = {
  center: OlProj.transform(
    [53, 33],
    projections.EPSG4326,
    projections.EPSG3857
  ),
  zoom: 4,
  projection: projections.EPSG3857,
  olmap: {},
};

export const MapReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CENTER_AND_ZOOM:
      return {
        ...state,
        center: action.payload.center,
        zoom: action.payload.zoom,
      };
    case INITIAL_OPENLAYERS_MAP:
      return {
        ...state,
        olmap: action.payload.olmap,
      };
    default:
      return state;
  }
};
