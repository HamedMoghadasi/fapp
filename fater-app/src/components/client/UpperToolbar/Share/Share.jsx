import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareAlt,
  faCopy,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faTelegramPlane,
} from "@fortawesome/free-brands-svg-icons";

import React, { Component } from "react";
import copy from "copy-to-clipboard";

import buildUrl from "build-url";
import $ from "jquery";
let APP_URL = process.env.REACT_APP_URL;

class Share extends Component {
  generateShareLink = (decoded) => {
    let map = $("#mapContainer").data("map");

    let view = map.getView();
    let center = view.getCenter();
    let projection = view.getProjection().code_;
    let zoom = view.getZoom();
    const url = buildUrl(APP_URL, {
      path: "home",
      queryParams: {
        lon: center[0],
        lat: center[1],
        zoom: zoom,
        projection: projection,
      },
    });
    if (decoded) {
      return url;
    }
    return encodeURIComponent(url);
  };

  handleCopy = () => {
    let url = this.generateShareLink(true);
    copy(url);
    console.log(url);

    $("#ShareButtons-container #copiedAlert").addClass("show");
    setTimeout(function () {
      $("#ShareButtons-container #copiedAlert").removeClass("show");
    }, 3000);
  };
  handleTelegram = () => {
    const telegramLink = "https://t.me/share/url?url=";
    const url = this.generateShareLink();

    const shareLink = `${telegramLink}${url}`;
    console.log(shareLink);

    window.open(shareLink, "_blank");
  };

  handleWhatsApp = () => {
    const whatsAppLink = "https://wa.me/?text=";
    const url = this.generateShareLink();

    const shareLink = `${whatsAppLink}${url}`;
    console.log(shareLink);

    window.open(shareLink, "_blank");
  };

  handleGmail = () => {
    const gmail =
      "https://mail.google.com/mail/?view=cm&su=Fater Web GIS, share link&body=";
    const url = this.generateShareLink();

    const shareLink = `${gmail}${url}`;
    console.log(shareLink);

    window.open(shareLink, "_blank");
  };
  render() {
    return (
      <>
        <FontAwesomeIcon
          icon={faShareAlt}
          className="ut-icon"
          id="share"
          data-toggle="collapse"
          data-target="#ShareButtons-container"
        />

        <div id="ShareButtons-container" className="collapse">
          <div id="copiedAlert">Copied!</div>
          <FontAwesomeIcon
            icon={faCopy}
            id="copy"
            title="Copy link"
            onClick={this.handleCopy}
          />
          <FontAwesomeIcon
            onClick={this.handleTelegram}
            icon={faTelegramPlane}
            id="telegram"
            title="Telegram"
          />
          <FontAwesomeIcon
            icon={faWhatsapp}
            onClick={this.handleWhatsApp}
            id="whatsapp"
            title="Whatsapp"
          />
          <FontAwesomeIcon
            icon={faEnvelope}
            onClick={this.handleGmail}
            id="Gmail"
            title="Gmail"
          />
        </div>
      </>
    );
  }
}

export default Share;
