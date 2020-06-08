import React, { Component } from "react";

import "./baselayersModal.css";

class BaseLayersModal extends Component {
  render() {
    return (
      <>
        <div
          className="modal fade"
          id="baseLayersModal"
          role="dialog"
          aria-labelledby="baseLayersModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="card">
                  <img
                    className="backgroundi"
                    src={require("../../../../assets/images/map-image.jpg")}
                    alt=""
                  />
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <button className="btn btn-primary m-2">
                      اضافه کردن نقشه
                    </button>
                    <button className="btn btn-secondary m-2">بیشتر</button>
                  </div>
                </div>
                <div className="card">
                  <img
                    className="backgroundi"
                    src={require("../../../../assets/images/map-image.jpg")}
                    alt=""
                  />
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <button className="btn btn-primary m-2">
                      اضافه کردن نقشه
                    </button>
                    <button className="btn btn-secondary m-2">بیشتر</button>
                  </div>
                </div>
                <div className="card">
                  <img
                    className="backgroundi"
                    src={require("../../../../assets/images/map-image.jpg")}
                    alt=""
                  />
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <button className="btn btn-primary m-2">
                      اضافه کردن نقشه
                    </button>
                    <button className="btn btn-secondary m-2">بیشتر</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BaseLayersModal;
