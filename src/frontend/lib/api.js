import axios from "axios";
export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}
export const fetchApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337",
  timeout: 1000,
  // headers: { "X-Custom-Header": "foobar" },
});
