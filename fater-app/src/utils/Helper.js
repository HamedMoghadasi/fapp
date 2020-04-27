import $ from "jquery";

export function SubmitByEnter() {
  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $("button[type='submit']").click();
    }
  });
}

export function HandleModalByKey() {
  $(document).on("keypress", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $(".modal.show button[type='button']").click();
    }
  });
}
