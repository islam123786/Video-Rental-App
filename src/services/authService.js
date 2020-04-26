import http from "../services/httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/auth";
const tokenKey = "token";

http.setJwt(localStorage.getItem(tokenKey));

async function login(user) {
  const { data: jwt } = await http.post(apiEndpoint, user);
  localStorage.setItem(tokenKey, jwt);
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}
function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {}
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
};
