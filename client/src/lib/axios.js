import axios from "axios";

const axiosObj = axios.create({
  baseURL: import.meta.API_URL,
  withCredentials: true, // send the cookies to server
});

export default axiosObj;
