import React, { Component } from "react";

import "./overlayersModal.css";

class OverLayersModal extends Component {
  render() {
    return (
      <>
        <div
          className="modal fade"
          id="overLayersModal"
          role="dialog"
          aria-labelledby="overLayersModalLabel"
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
                <ul
                  className="nav nav-tabs nav-justified"
                  id="overlayersModal-tab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="customOverlayers-tab"
                      data-toggle="tab"
                      href="#customOverlayers"
                      role="tab"
                      aria-controls="customOverlayers"
                      aria-selected="false"
                    >
                      لایه سفارشی
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="defaultOverlayers-tab"
                      data-toggle="tab"
                      href="#defaultOverlayers"
                      role="tab"
                      aria-controls="defaultOverlayers"
                      aria-selected="true"
                    >
                      لایه های پیش فرض
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="overlayersModal-tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="defaultOverlayers"
                    role="tabpanel"
                    aria-labelledby="defaultOverlayers-tab"
                  >
                    پیش فرض
                  </div>

                  <div
                    className="tab-pane fade"
                    id="customOverlayers"
                    role="tabpanel"
                    aria-labelledby="customOverlayers-tab"
                  >
                    <input type="file" accept="application/vnd.geo+json" />
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

export default OverLayersModal;
