import $ from "jquery";

export const displayLoader = (time) => {
  $(".loader-wrapper").toggle();
  setTimeout(() => {
    $(".loader-wrapper").toggle();
  }, time);
};
