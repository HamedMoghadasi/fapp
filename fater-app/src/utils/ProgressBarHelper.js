import $ from "jquery";

export const hideProgressbar = () => {
  $(".progressBar-container").toggle("display");
};

export const moveProgressBarForward = (val) => {
  $(".progressBar-container").css("display", "block");
  let value = $("#progressBar").attr("aria-valuenow");
  let max = $("#progressBar").attr("aria-valuemax");
  value = Number(value) + val;
  if (value < max) {
    console.log("value :>> ", value);
    $("#progressBar").attr("aria-valuenow", value);
    let width = `${value}%`;
    $("#progressBar").css("width", width);
  } else {
    let width = `100%`;
    $("#progressBar").attr("aria-valuenow", 100);
    $("#progressBar").css("width", width);
  }
};
