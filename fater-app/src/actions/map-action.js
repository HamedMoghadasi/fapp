export const UPDATE_CENTER_AND_ZOOM = "UPDATE_CENTER_AND_ZOOM";
export const INITIAL_OPENLAYERS_MAP = "INITIAL_OPENLAYERS_MAP";

export const updateCenterAndZoom = (center, zoom) => ({
  type: UPDATE_CENTER_AND_ZOOM,
  payload: {
    center,
    zoom
  }
});

export const initialOpenLayersToState = olmap => ({
  type: INITIAL_OPENLAYERS_MAP,
  payload: {
    olmap
  }
});
