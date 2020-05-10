import React from "react";
import $ from "jquery";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import "datatables.net-bs4/js/dataTables.bootstrap4";
import "datatables.net-select/js/dataTables.select";
import { userState } from "../../../constants/userState";

import "./table.css";
require("datatables.net");

export default class Tableo extends React.Component {
  constructor(props) {
    super(props);
    this.datatable = null;
  }

  componentDidMount() {
    const { configuration } = this.props;
    const operators = configuration.operators;
    $(document).ready(function () {
      this.dataTable = $("#tableo").DataTable({
        data: configuration.data,
        columns: configuration.columns,
        select: {
          info: false,
        },
        searchValue: "",
        options: {
          dom: "lfrtip",
          paging: true,
          scrollY: true,
          scrollX: true,
          scrollCollapse: true,
        },
        language: {
          search: "",
          lengthMenu: "_MENU_",
          info: "نمایش رکورد های _START_ تا _END_ از مجموع _TOTAL_ داده",
        },

        createdRow: function (row, data, dataIndex, cells) {
          if (!$(".operatorBtn").prop("disabled")) {
            $(".operatorBtn").prop("disabled", true);
          }
        },
        rowCallback: function (row, data, displayNum, displayIndex, dataIndex) {
          configuration.rowCallback(
            row,
            data,
            displayNum,
            displayIndex,
            dataIndex
          );
        },
      });

      const dt = this.dataTable;
      this.dataTable.on("select", function () {
        let isDeletedRow =
          dt.row(".selected").data().state === userState.Deleted;

        if (!isDeletedRow) $(".operatorBtn").prop("disabled", false);
      });

      this.dataTable.on("deselect", function () {
        $(".operatorBtn").prop("disabled", true);
      });

      if (operators.length) {
        operators.forEach((operator) => {
          $(operator.dom).on(operator.event, function () {
            operator.handler(dt);
          });
        });
      }
    });
  }

  componentWillUnmount() {
    $("#tableo").DataTable().destroy(true);
  }

  // connecting search to an external component, optional but shows how to access the API
  search = (value) => {
    this.dataTable.search(value).draw();
  };

  render() {
    return (
      <>
        {this.props.children}
        <hr />
        <table id="tableo" className="table table-striped " width="100%" />
      </>
    );
  }
}
