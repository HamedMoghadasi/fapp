import $ from "jquery";

let API_URL = process.env.REACT_APP_API_URL;

export const getHeatMapUrl = (timespan, params) => {
  try {
    const body = {
      parameter: params.parameter,
      location: params.location,
      satellite: params.satellite,
      timespan: timespan,
    };

    var temp = null;
    $.ajax({
      url: `${API_URL}/api/v1/heatMapServer/geturl`,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      async: false,
      xhrFields: {
        withCredentials: true,
      },
      data: JSON.stringify(body),
      success: function (response) {
        temp = response.data;
      },
      error: function (error) {
        const msg = error.responseJSON.message;
        console.error(msg);
      },
    });
    return temp;
  } catch (error) {
    console.log(error);
    return { isValid: false };
  }
};

export const getHeatMapChangeUrl = (timespan, params) => {
  try {
    const body = {
      parameter: params.parameter,
      location: params.location,
      satellite: params.satellite,
      timespan: timespan,
    };

    var temp = null;
    $.ajax({
      url: `${API_URL}/api/v1/heatMapServer/getChangeUrl`,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      async: false,
      xhrFields: {
        withCredentials: true,
      },
      data: JSON.stringify(body),
      success: function (response) {
        temp = response.data;
      },
      error: function (error) {
        const msg = error.responseJSON.message;
        console.error(msg);
      },
    });
    return temp;
  } catch (error) {
    console.log(error);
    return { isValid: false };
  }
};
