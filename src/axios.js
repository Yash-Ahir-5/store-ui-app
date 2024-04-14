import axios from "axios";

const API = "http://localhost:3050";

const BASEURL = axios.create({
  baseURL: API,
});

export default API;