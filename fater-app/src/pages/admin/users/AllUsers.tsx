import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { Protect } from "../../../utils/Auth";
import { Redirect } from "react-router-dom";

import AdminTemplateContainer from "../../../components/admin/template/adminTemplate";
import Table from "../../../components/admin/table/table";

export interface IAllUsersProps {
  needAuthentication: boolean;
  neededRole: string;
}

const AllUsers: React.FC<IAllUsersProps> = (props) => {
  var userState = Protect(props);
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Operation",
        accessor: "operation",
      },
    ],
    undefined
  );

  const data = React.useMemo(
    () => [
      {
        firstName: "Hamed",
        lastName: "Moghadasi",
        age: 25,
      },
      {
        firstName: "HamidReza",
        lastName: "Moghadasi",
        age: 25,
      },
    ],
    undefined
  );

  if (userState.isValid) {
    return (
      <IonPage>
        <IonContent>
          <AdminTemplateContainer isSidebarOpen="true" menu="users">
            <h1>All Users</h1>
            <Table columns={columns} data={data} />
          </AdminTemplateContainer>
        </IonContent>
      </IonPage>
    );
  }

  return <Redirect to={userState.redirectPath} />;
};

export default AllUsers;
