import $ from "jquery";
import { Image as ImageLayer } from "ol/layer";

export const getMap = () => {
  var promise = new Promise(function (resolve, reject) {
    window.setTimeout(function () {
      var map = $("#mapContainer").data("map");
      resolve(map);
    });
  });
  return promise;
};

export const getCountOfHeatMaps = () => {
  let count = 0;
  var mapContainer = $("#mapContainer").data("map");
  mapContainer
    .getLayers()
    .getArray()
    .map((layer, index) => {
      if (layer instanceof ImageLayer && layer.get("isHeatMap")) {
        count = count + 1;
      }
    });

  return count;
};
