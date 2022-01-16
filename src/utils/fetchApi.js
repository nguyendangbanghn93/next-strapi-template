import axios from "axios";

const fetchAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337",
  timeout: 3000,
  responseType: "json",
  // proxy: {
  //   protocol: "https",
  //   host: "127.0.0.1",
  //   port: 9000,
  //   auth: {
  //     username: "mikeymike",
  //     password: "rapunz3l",
  //   },
  // },
});
export default fetchAPI;
