import {jwtDecode} from "jwt-decode";
import axios from "axios";
import {API_URL} from "../routes/Url";

interface TokenBase {
  iat: number;
  options: {
    expiresIn: string;
  };
  user: {
    email: string;
    firstName: string;
    lastName: string;
    id: string;
    isAdmin: boolean;
  };
}

export const isTokenValid = () => {
  const token = localStorage.getItem("token");

  if (!!token) {
    const decodedToken: TokenBase = jwtDecode(token);
    const currentDate = new Date();

    if (decodedToken.iat) {
      const tokenDate = new Date(decodedToken.iat * 1000);
      tokenDate.setHours(tokenDate.getHours() + 2);
      return tokenDate > currentDate;
    }
  }
  return false;
};

export const connectedUser = async () => {
  const token = localStorage.getItem("token");

  if (!!token && isTokenValid()) {
    const currentUser = await axios({
      method: "get",
      url: API_URL + "/auth",
      headers: {Authorization: "Bearer " + localStorage.getItem("token")},
    });
    return currentUser.data;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.pathname = "/login";
};
