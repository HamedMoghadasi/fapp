import React, { Component } from "react";

import CustomOverLayers from "./customOverLayers/customOverLayers";
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
                    <div className="accordion" id="accordionExample">
                      <div className="card">
                        <div
                          className="card-header collapsed"
                          id="headingOne"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          <h5 className="mb-0">
                            <span className="btn btn-default">
                              Vector Layer #1
                            </span>
                          </h5>
                        </div>

                        <div
                          id="collapseOne"
                          className="collapse"
                          aria-labelledby="headingOne"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et. Nihil anim keffiyeh
                            helvetica, craft beer labore wes anderson cred
                            nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer
                            farm-to-table, raw denim aesthetic synth nesciunt
                            you probably haven't heard of them accusamus labore
                            sustainable VHS.
                          </div>
                        </div>
                      </div>

                      <div className="card">
                        <div
                          className="card-header collapsed"
                          id="headingTwo"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          <h5 className="mb-0">
                            <span className="btn btn-default">
                              Vector Layer #2
                            </span>
                          </h5>
                        </div>

                        <div
                          id="collapseTwo"
                          className="collapse"
                          aria-labelledby="headingTwo"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et. Nihil anim keffiyeh
                            helvetica, craft beer labore wes anderson cred
                            nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer
                            farm-to-table, raw denim aesthetic synth nesciunt
                            you probably haven't heard of them accusamus labore
                            sustainable VHS.
                          </div>
                        </div>
                      </div>

                      <div className="card">
                        <div
                          className="card-header collapsed"
                          id="headingThree"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          <h5 className="mb-0">
                            <span className="btn btn-default">
                              Vector Layer #3
                            </span>
                          </h5>
                        </div>

                        <div
                          id="collapseThree"
                          className="collapse"
                          aria-labelledby="headingThree"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et. Nihil anim keffiyeh
                            helvetica, craft beer labore wes anderson cred
                            nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer
                            farm-to-table, raw denim aesthetic synth nesciunt
                            you probably haven't heard of them accusamus labore
                            sustainable VHS.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CustomOverLayers
                    refreshComponent={this.props.refreshComponent}
                  />
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
