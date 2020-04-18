import { Roles } from "../constants/Roles";
import { Urls } from "../constants/Urls";

export interface IUserAuthState {
  isAuthentication: boolean;
  role: string;
}

export interface IAuthRequirement {
  needAuthentication: boolean;
  neededRole: Roles;
}

const backendObject = {
  isAuthentication: false,
  role: "Admin",
};

const userState: IUserAuthState = {
  isAuthentication: backendObject.isAuthentication, //verify token
  role: backendObject.role, // getUserRoleByToken
};

interface IResult {
  redirectPath: string;
  isValid: boolean;
}

const result: IResult = {
  redirectPath: Urls.AccessDenied,
  isValid: false,
};

export const Protect = (props: IAuthRequirement) => {
  if (props.needAuthentication) {
    if (userState.isAuthentication) {
      console.log("user authenticated");
      if (
        userState.role === props.neededRole.toString() ||
        userState.role === Roles.Admin.toString()
      ) {
        console.log("user authorized");
        result.isValid = true;
      } else {
        console.log("403 :: Access Denied !");
        result.redirectPath = Urls.AccessDenied;
      }
    } else {
      console.log("redirect to login. \n user is not authenticated.");
      result.redirectPath = Urls.Login;
    }
  }

  return result;
};
