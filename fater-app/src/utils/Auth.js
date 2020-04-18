import { Roles } from "../constants/Roles";
import { Urls } from "../constants/Urls";
import $ from "jquery";

let API_URL = process.env.REACT_APP_API_URL;

export default class AuthHelper {
  static async isAuthenticated() {
    const token = window.localStorage.getItem("access_token");
    console.log(token);
  }
}

const userState = {
  isAuthentication: false,
  role: "",
};

const result = {
  redirectPath: Urls.Login,
  isValid: false,
};

export const Protect = (props) => {
  var verifyResponse = verifyUser();
  console.log("ajax response", verifyUser);
  if (verifyResponse) {
    userState.isAuthentication = verifyResponse.isValid;
    userState.role = verifyResponse.role;

    if (props.needAuthentication) {
      console.log("need Authenticat!");
      if (userState.isAuthentication) {
        console.log("authenticated");
        if (
          userState.role === props.neededRole ||
          userState.role === Roles.Admin
        ) {
          console.log("user authorized");
          result.isValid = true;
          result.redirectPath = "";
        } else {
          console.log("403 :: Access Denied !");
          result.redirectPath = Urls.AccessDenied;
        }
      } else {
        console.log("redirect to login. \n user is not authenticated.");
        result.redirectPath = Urls.Login;
      }
    }
  }
  return result;
};

const verifyUser = function () {
  try {
    const body = {
      token: window.localStorage.access_token.replace(/"/g, ""),
    };
    console.log("body", body);

    var temp = null;
    $.ajax({
      url: `${API_URL}/api/v1/auth/verifyUser`,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      async: false,
      xhrFields: {
        withCredentials: true,
      },
      data: JSON.stringify(body),
      success: function (response) {
        temp = response.data;
        console.log(response.message);
      },
      error: function (error) {
        const msg = error.responseJSON.message;
        console.error(msg);
      },
    });
    return temp;
  } catch (error) {
    console.log(error);
    return { isValid: false, role: "" };
  }
};
