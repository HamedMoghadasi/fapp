import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { Protect } from "../../../../utils/Auth";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import jmoment from "jalali-moment";

import AdminTemplateContainer from "../../../../components/admin/template/adminTemplate";
import Table from "../../../../components/admin/table/table";
import DeleteBaseMapModal from "../../../../components/admin/modal/Overlayers/CustomOverLayers/deleteCustomOverLayersModal";
import EditCustomOverLayersModal from "../../../../components/admin/modal/Overlayers/CustomOverLayers/editCustomOverLayersModal";
// import AddBaseMapModal from "../../../components/admin/modal/BaseMaps/addBaseMapModal";
import { ToastContainer } from "react-toastify";

let API_URL = process.env.REACT_APP_API_URL;

export interface ICustomOverLayersProps {
  needAuthentication: boolean;
  neededRole: string;
}

function getData() {
  let data: any = [];
  if (window.localStorage.access_token) {
    $.ajax({
      url: `${API_URL}/api/v1/customVectorFile`,
      type: "GET",
      async: false,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          `Beare ${window.localStorage.access_token.replace(/"/g, "")}`
        );
      },
      success: function (response) {
        data = response.data;
        if (data) {
          // eslint-disable-next-line array-callback-return
          data.map((item: any) => {
            item.createdAt = `${jmoment(item.createdAt).format(
              "jYYYY/jMM/jDD"
            )} <span class="badge badge-warning" style="opacity:0.6;margin-left:5px">${jmoment(
              item.createdAt
            ).format("HH:mm")}</span>`;

            item.updatedAt = `${jmoment(item.updatedAt).format(
              "jYYYY/jMM/jDD"
            )} <span class="badge badge-warning" style="opacity:0.6;margin-left:5px">${jmoment(
              item.updatedAt
            ).format("HH:mm")}</span>`;
          });
        }
      },
    });
  }

  return data;
}

function getColumns() {
  return [
    { title: "Id", data: "id" },
    { title: "Name", data: "name" },
    { title: "Description", data: "description" },
    { title: "Created at", data: "createdAt" },
    { title: "Updated at", data: "updatedAt" },
  ];
}

const configuration = {
  operators: {},
  data: getData(),
  columns: getColumns(),
  createdRow: function () {},
  rowCallback: function () {},
};

const CustomOverLayers: React.FC<ICustomOverLayersProps> = (props) => {
  var userState = Protect(props);

  if (userState.isValid) {
    return (
      <IonPage>
        <IonContent>
          <ToastContainer />
          <DeleteBaseMapModal />
          <EditCustomOverLayersModal />
          <AdminTemplateContainer
            isSidebarOpen="true"
            pageTitle="لیست فایل‌های GeoJSON"
          >
            <Table configuration={configuration}>
              {" "}
              <br />
              <div className="row allusers-operator-container">
                <button
                  id="editBtn"
                  className="btn btn-md btn-warning m-1 operatorBtn float-right"
                  data-toggle="modal"
                  data-target="#editModal"
                >
                  ویرایش
                </button>

                <button
                  id="deleteBtn"
                  className="btn btn-md btn-danger m-1 operatorBtn float-right"
                  data-toggle="modal"
                  data-target="#deleteModal"
                >
                  حذف
                </button>
              </div>
              <hr />
            </Table>
          </AdminTemplateContainer>
        </IonContent>
      </IonPage>
    );
  }

  return <Redirect to={userState.redirectPath} />;
};

export default CustomOverLayers;
