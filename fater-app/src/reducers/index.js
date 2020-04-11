import { combineReducers } from "redux";
import { MapReducer } from "./map-reducer";

const rootReducer = combineReducers({
  map: MapReducer
});

export default rootReducer;
