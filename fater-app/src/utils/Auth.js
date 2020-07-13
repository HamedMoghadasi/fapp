import { Roles } from "../constants/Roles";
import { Urls } from "../constants/Urls";
import $ from "jquery";

let API_URL = process.env.REACT_APP_API_URL;

export default class AuthHelper {
  static async isAuthenticated() {
    const token = window.localStorage.getItem("access_token");
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

const isGranted = (userRole, neededRoles) => {
  let isPermitted = false;

  neededRoles.forEach((neededRole) => {
    if (userRole === neededRole) {
      isPermitted = true;
    }
  });

  if (userRole === Roles.Admin) {
    isPermitted = true;
  }

  return isPermitted;
};

export const Protect = (props) => {
  var verifyResponse = verifyUser();
  if (verifyResponse) {
    userState.isAuthentication = verifyResponse.isValid;
    userState.role = verifyResponse.role;

    if (props.needAuthentication) {
      if (userState.isAuthentication) {
        if (isGranted(userState.role, props.neededRole)) {
          result.isValid = true;
          result.redirectPath = "";
        } else {
          console.log("403 :: Access Denied !");
          result.redirectPath = Urls.AccessDenied;
        }
      } else {
        console.log("redirect to login. \n user is not authenticated.");
        result.redirectPath = Urls.Login;
        result.isValid = false;
      }
    }
  }
  return result;
};

export const verifyUser = function () {
  try {
    if (!window.localStorage.access_token) {
      console.log("Token not founded");
      return { isValid: false, role: "" };
    } else {
      const body = {
        token: window.localStorage.access_token.replace(/"/g, ""),
      };

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
        },
        error: function (error) {
          const msg = error.responseJSON.message;
          console.error(msg);
        },
      });
    }
    console.log("temp :>> ", temp);
    return temp;
  } catch (error) {
    console.log(error);
    return { isValid: false, role: "" };
  }
};

export const GetAuthenticatedUser = function () {
  try {
    if (!window.localStorage.access_token) {
      return {};
    } else {
      const body = {
        token: window.localStorage.access_token.replace(/"/g, ""),
      };

      var temp = null;
      $.ajax({
        url: `${API_URL}/api/v1/auth/getAuthenticatedUser`,
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
        },
        error: function (error) {
          console.error(error);
        },
      });
    }

    return temp;
  } catch (error) {
    console.log(error);
    return { message: "and error occured" };
  }
};
