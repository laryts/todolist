import axios from "axios";

const api = axios.create({
  baseURL: "https://todowebservice.herokuapp.com/api"
});

export default api;
