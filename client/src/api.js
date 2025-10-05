// client/src/api.js
import axios from "axios";

<<<<<<< HEAD
=======
// Create an axios instance that uses your backend URL
>>>>>>> b7f1da0 (Fix API imports and add axios baseURL for deployment)
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080",
});

export default API;
