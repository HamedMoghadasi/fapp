import $ from "jquery";

export const getMap = () => {
  var promise = new Promise(function (resolve, reject) {
    window.setTimeout(function () {
      var map = $("#mapContainer").data("map");
      resolve(map);
    });
  });
  return promise;
};
