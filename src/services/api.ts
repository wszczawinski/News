import type { Banner, Category, Paginated, Post, PostQueryParams, PostsQueryParams } from '@/types';

const apiUrl = import.meta.env.VITE_API_URL;

const fetchJson = async <T>(url: string, signal?: AbortSignal): Promise<T> => {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const buildUrl = (endpoint: string): string => {
  return `${apiUrl}/${endpoint}`;
};

export const ENDPOINTS = {
  POSTS: 'posts',
  BANNERS: 'banners',
  CATEGORIES: 'categories',
} as const;

export const QUERY_KEYS = {
  POST: 'post',
  POSTS: 'posts',
  BANNERS: 'banners',
  CATEGORIES: 'categories',
} as const;

export const getPosts = async ({ category, page, signal }: PostsQueryParams & { signal?: AbortSignal }): Promise<Paginated<Post>> => {
  const url = new URL(buildUrl(ENDPOINTS.POSTS));

  url.searchParams.append('page', String(page));

  if (category !== null) {
    url.searchParams.append('category', String(category));
  }

  return fetchJson<Paginated<Post>>(url.toString(), signal);
};

export const getPost = async ({ id, signal }: PostQueryParams & { signal?: AbortSignal }): Promise<Post> => {
  const url = buildUrl(`${ENDPOINTS.POSTS}/${id}`);
  return fetchJson<Post>(url, signal);
};

export const getCategories = async ({ signal }: { signal?: AbortSignal } = {}): Promise<Category[]> => {
  const url = buildUrl(ENDPOINTS.CATEGORIES);
  return fetchJson<Category[]>(url, signal);
};

export const getBanners = async ({ signal }: { signal?: AbortSignal } = {}): Promise<Banner[]> => {
  const url = buildUrl(ENDPOINTS.BANNERS);
  return fetchJson<Banner[]>(url, signal);
};
