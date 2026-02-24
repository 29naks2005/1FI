import axios from "axios";

const api = axios.create({
    baseURL: "https://onefi-lk9e.onrender.com/api",
});

export default api;
