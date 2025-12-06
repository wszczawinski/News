import type { Banner, Category, Paginated, Post, PostQueryParams, PostsQueryParams } from '@/types';

const apiUrl = import.meta.env.VITE_API_URL;

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const buildUrl = (endpoint: string): string => {
  return `${apiUrl}/${endpoint}`;
};

export enum ENDPOINTS {
  POSTS = 'posts',
  BANNERS = 'banners',
  CATEGORIES = 'categories',
}

export enum QUERY_KEYS {
  POST = 'post',
  POSTS = 'posts',
  BANNERS = 'banners',
  CATEGORIES = 'categories',
}

export const getPosts = async ({ category, page }: PostsQueryParams): Promise<Paginated<Post>> => {
  const url = new URL(buildUrl(ENDPOINTS.POSTS));

  url.searchParams.append('page', String(page));

  if (category !== null) {
    url.searchParams.append('category', String(category));
  }

  return fetchJson<Paginated<Post>>(url.toString());
};

export const getPost = async ({ id }: PostQueryParams): Promise<Post> => {
  const url = buildUrl(`${ENDPOINTS.POSTS}/${id}`);
  return fetchJson<Post>(url);
};

export const getCategories = async (): Promise<Category[]> => {
  const url = buildUrl(ENDPOINTS.CATEGORIES);
  return fetchJson<Category[]>(url);
};

export const getBanners = async (): Promise<Banner[]> => {
  const url = buildUrl(ENDPOINTS.BANNERS);
  return fetchJson<Banner[]>(url);
};
