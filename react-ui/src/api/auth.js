import axios from "./index";

const base = "http://127.0.0.1:8000/api/users";  // ← IMPORTANT

class AuthApi {
  static Login(data) {
    return axios.post(`${base}/login/`, data);
  }

  static Register(data) {
    return axios.post(`${base}/register/`, data);
  }

  static Logout(accessToken, refreshToken) {
    return axios.post(
      `${base}/logout/`,
      { refresh: refreshToken },   // send refresh token here
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  }
}

export default AuthApi;
