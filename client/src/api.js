import axios from "axios";

const API = axios.create({
  baseURL: "https://blogbase-s16g.onrender.com" // <-- Your backend
});

export default API;

