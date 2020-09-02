import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";

import { projections } from "../../../../constants/projections";
import * as OlProj from "ol/proj";
import { isMobile } from "react-device-detect";

import "./Search.css";
let API_URL = process.env.REACT_APP_API_URL;

class Search extends Component {
  state = {
    searchedData: [],
    isLoading: false,
  };

  handleSearchInput = (e) => {
    var self = this;

    var $input = $(e.target);
    if ($input.val().length >= 2) {
      let body = { searchedPhrase: $input.val().toLowerCase() };

      $.ajax({
        url: `${API_URL}/api/v1/Location/find`,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        xhrFields: {
          withCredentials: true,
        },
        data: JSON.stringify(body),
        success: function (response) {
          if (response.data) {
            $("#Search-input").addClass("hasResult");
            self.setState({
              searchedData: response.data.map((location) => {
                return {
                  Name: location.Name,
                  lat: location.lat,
                  lon: location.lon,
                };
              }),
            });
          } else {
            $("#Search-input").removeClass("hasResult");
            self.setState({ searchedData: [] });
          }
        },
        error: function (err) {
          console.error(err);
        },
      });
    } else {
      $("#Search-input").removeClass("hasResult");
      this.setState({ searchedData: [] });
    }
  };

  handleClose = () => {
    $(".searchArea").addClass("hide");
    $("#searchArea-input").val("");
    $("#Search-input").val("");
    $("#Search-input").removeClass("hasResult");
    this.setState({ searchedData: [] });
  };

  handleSearchIconClick = () => {
    // $(".searchArea").removeClass("hide");
    // document.getElementById("searchArea-input").focus();
    this.handleClose();

    document.getElementById("Search-input").focus();
  };

  handleTransfer = (lat, lon) => {
    this.handleClose();

    let map = $("#mapContainer").data("map");
    if (isMobile) {
      setTimeout(() => {
        map.getView().animate({
          center: OlProj.transform(
            [Number(lon), Number(lat)],
            projections.EPSG4326,
            projections.EPSG3857
          ),
          zoom: 10,
          projection: projections.EPSG3857,
          duration: 1000,
        });
      }, 500);
    } else {
      map.getView().animate({
        center: OlProj.transform(
          [Number(lon), Number(lat)],
          projections.EPSG4326,
          projections.EPSG3857
        ),
        zoom: 10,
        projection: projections.EPSG3857,
        duration: 1000,
      });
    }
  };

  render() {
    return (
      <>
        <FontAwesomeIcon
          icon={faSearch}
          className="ut-icon"
          id="searchIcon"
          onClick={this.handleSearchIconClick}
          title="Search a location"
          data-toggle="collapse"
          data-target="#Search-container"
        />
        <div id="Search-container" className="collapse">
          <div id="Search-wrapper">
            <input
              type="text"
              id="Search-input"
              className="form-control shadow-none"
              placeholder="مکان مورد نظر خود را جستجو کنید"
              autoComplete="off"
              onChange={(e) => this.handleSearchInput(e)}
            />
            <ul className="searchResult-ul">
              {this.state.searchedData &&
                this.state.searchedData.map((location, index) => {
                  return (
                    <li
                      className="searchResult-li"
                      key={index}
                      onClick={() =>
                        this.handleTransfer(location.lat, location.lon)
                      }
                    >
                      {location.Name}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        {/* mobile  */}
        {/* <div className="searchArea hide">
          <div className="searchArea-wrapper">
            <div className="searchArea-SearchBox">
              <input
                type="text"
                dir="rtl"
                placeholder="مکان مورد نظر خود را جستجو کنید"
                id="searchArea-input"
                autoComplete="off"
                onChange={(e) => this.handleSearchInput(e)}
              />
            </div>
            <div className="searchArea-SearchResult">
              <ul className="searchResult-ul">
                {this.state.searchedData &&
                  this.state.searchedData.map((location, index) => {
                    return (
                      <li
                        className="searchResult-li"
                        key={index}
                        onClick={() =>
                          this.handleTransfer(location.lat, location.lon)
                        }
                      >
                        <ul className="searchResult-detail">
                          <li className="searchResult-details-data">
                            {location.Name}
                          </li>
                          <li className="searchResult-details-data">
                            {location.lat} {location.lon}
                          </li>
                        </ul>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="closeSearchArea" onClick={this.handleClose}>
            <IonIcon icon={close} />
          </div>
        </div> */}
      </>
    );
  }
}

export default Search;
