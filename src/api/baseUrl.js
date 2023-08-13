import axios from "axios";

const BASE_URL = "https://run.mocky.io";

export const axiosApi = axios.create({
  baseURL: BASE_URL,
});

axiosApi.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {}
);

axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return err.response;
  }
);

export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}
