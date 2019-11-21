import { url } from "./api";
import axios from "axios";
export const testLogin = (username: string, password: string): boolean => {
  axios.post(`${url}/connexion`, { mail: username, password }).then(e => {
    if (e.data === true) {
      localStorage.setItem(username, "username");
      return true;
    }
  });
  return false;
};

export const isLogin = () => {};
