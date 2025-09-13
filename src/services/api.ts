import type { PostQueryParams } from "@/types";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: apiUrl
});

export enum ENDPOINTS {
  POSTS = "posts",
  POST = 'post'
}

export enum QUERY_KEYS {
  POST = 'post',
  POSTS = "posts",
}

export const fetcher = async <T, K>(url: ENDPOINTS, params: K) => {
  const res = await axiosInstance.get<T>(url, { params });
  return res.data;
};


export const getPost = async ({ id }: PostQueryParams) => {
  const res = await axiosInstance.get(`${ENDPOINTS.POSTS}/${id}`);
  return res.data;
}
