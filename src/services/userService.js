import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users/";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    username: user.username,
    password: user.password,
  });
}

export function registerMod(user) {
  return http.post(`${apiEndpoint}mod/`, {
    email: user.email,
    username: user.username,
    password: user.password,
  });
}

export function getUserProfile(user) {
  return http.get(`${apiUrl}/user/profile/${user}/`);
}
