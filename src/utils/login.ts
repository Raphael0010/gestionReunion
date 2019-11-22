import { url } from "./api";
import axios from "axios";

export const testLogin = async (username: string, password: string) => {
  return axios
    .post(`${url}/connexion`, { mail: username, password: password })
    .then(e => {
      if (e.data !== "") {
        localStorage.setItem("username", e.data.name);
        localStorage.setItem("id", e.data.id);
        localStorage.setItem("role", e.data.job);
        localStorage.setItem("connected", "true");
        return true;
      } else {
        return false;
      }
    });
};

export const isLogin = (): boolean => {
  if (localStorage.getItem("connected") === "true") {
    return true;
  }
  return false;
};

export const getRole = (): string | null => {
  return localStorage.getItem("role");
};

export const getName = (): string | null => {
  return localStorage.getItem("username");
};

export const getEmail = (): string | null => {
  return localStorage.getItem("email");
};

export const getId = (): string | null => {
  return localStorage.getItem("id");
};

export const logout = (): void => {
  localStorage.clear();
  document.location.replace("/login");
};
