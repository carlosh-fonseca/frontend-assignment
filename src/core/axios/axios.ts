import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
