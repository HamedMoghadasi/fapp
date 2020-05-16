import React, { Component } from "react";
import Sidebar from "../sidebar/sidebar";
import "./adminTemplate.css";

class AdminTemplate extends Component {
  render() {
    return (
      <div>
        <Sidebar
          isSidebarOpen={this.props.isSidebarOpen}
          menu={this.props.menu}
        />
        <div id="adminContentContainer" className="">
          <h1 className="table-page-header">{this.props.pageTitle}</h1>
          <div className="col-lg-12 table-conatiner">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default AdminTemplate;
