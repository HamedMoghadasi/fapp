import React from "react";
import $ from "jquery";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import "datatables.net-bs4/js/dataTables.bootstrap4";
import "datatables.net-select/js/dataTables.select";

import "./table.css";
require("datatables.net");

export default class Tableo extends React.Component {
  constructor(props) {
    super(props);
    this.datatable = null;
  }

  componentDidMount() {
    const operators = this.props.operators;
    $(document).ready(function () {
      this.dataTable = $("#tableo").DataTable({
        data: [
          { id: 1, name: "Hamed Moghadasi", age: 25 },
          { id: 2, name: "reza gholi", age: 25 },
          { id: 3, name: "juju razii", age: 25 },
          { id: 1, name: "Hamed Moghadasi", age: 25 },
          { id: 2, name: "reza gholi", age: 25 },
          { id: 3, name: "juju razii", age: 25 },
          { id: 1, name: "Hamed Moghadasi", age: 25 },
          { id: 2, name: "reza gholi", age: 25 },
          { id: 3, name: "juju razii", age: 25 },
          { id: 1, name: "Hamed Moghadasi", age: 25 },
          { id: 2, name: "reza gholi", age: 25 },
          { id: 3, name: "juju razii", age: 25 },
          { id: 1, name: "Hamed Moghadasi", age: 25 },
          { id: 2, name: "reza gholi", age: 25 },
          { id: 3, name: "juju razii", age: 25 },
          { id: 1, name: "Hamed Moghadasi", age: 25 },
          { id: 2, name: "reza gholi", age: 25 },
          { id: 3, name: "juju razii", age: 25 },
          { id: 1, name: "Hamed Moghadasi", age: 25 },
          { id: 2, name: "reza gholi", age: 25 },
          { id: 3, name: "juju razii", age: 25 },
          { id: 1, name: "Hamed Moghadasi", age: 25 },
          { id: 2, name: "reza gholi", age: 25 },
          { id: 3, name: "juju razii", age: 25 },
        ],
        columns: [
          { title: "#", data: "id" },
          { title: "Name", data: "name" },
          { title: "Age", data: "age" },
        ],
        select: true,
        searchValue: "",
        options: {
          dom: "lfrtip",
          paging: true,
          scrollY: 300,
          scrollX: true,
          scrollCollapse: true,
        },
        createdRow: function (row, data, dataIndex, cells) {
          if (!$(".operatorBtn").prop("disabled")) {
            $(".operatorBtn").prop("disabled", true);
          }
        },
      });

      this.dataTable.on("select", function () {
        $(".operatorBtn").prop("disabled", false);
      });

      this.dataTable.on("deselect", function () {
        $(".operatorBtn").prop("disabled", true);
      });

      const dt = this.dataTable;

      operators.forEach((operator) => {
        $(operator.dom).on(operator.event, function () {
          operator.handler(dt);
        });
      });
    });
  }

  componentWillUnmount() {
    $("#tableo").DataTable().destroy(true);
    console.log($("#tableo").DataTable());
  }

  // connecting search to an external component, optional but shows how to access the API
  search = (value) => {
    this.dataTable.search(value).draw();
  };

  render() {
    return (
      <>
        {this.props.children}
        <table
          id="tableo"
          className="table table-striped table-bordered"
          width="100%"
        />
      </>
    );
  }
}
