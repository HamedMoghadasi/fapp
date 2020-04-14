export default class AuthHelper {
  static async isAuthenticated() {
    const token = window.localStorage.getItem("access_token");
    console.log(token);
  }
}
