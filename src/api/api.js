import axios from "axios";

const API = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
})
export default API;