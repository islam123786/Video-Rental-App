import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const expectError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectError) {
    logger.log(error);
    console.log("An unexpected error occurred", error);
    toast.error("An unexpected error occurred", error);
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  //Configure header to all http request
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
