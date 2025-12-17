import axios from "./index";

// Use backend URL, not frontend URL
const base = "https://api-server-django-zjnz.onrender.com/api/users";

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
