import axios from 'axios';

import type { Category, Paginated, Post, PostQueryParams, PostsQueryParams } from '@/types';

const apiUrl = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export enum ENDPOINTS {
  POSTS = 'posts',
  CATEGORIES = 'categories',
}

export enum QUERY_KEYS {
  POST = 'post',
  POSTS = 'posts',
  CATEGORIES = 'categories',
}

export const getPosts = async (params: PostsQueryParams): Promise<Paginated<Post>> => {
  const res = await axiosInstance.get(ENDPOINTS.POSTS, { params });
  return res.data;
};

export const getPost = async ({ id }: PostQueryParams): Promise<Post> => {
  const res = await axiosInstance.get(`${ENDPOINTS.POSTS}/${id}`);
  return res.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const res = await axiosInstance.get(ENDPOINTS.CATEGORIES);
  return res.data;
};
