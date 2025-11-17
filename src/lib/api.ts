import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
});

export const createAdminApi = (adminKey: string) => {
  return axios.create({
    baseURL: "/api/admin",
    headers: {
      "X-Admin-Key": adminKey,
    },
  });
};
