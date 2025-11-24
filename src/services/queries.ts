import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import type { PostQueryParams, PostsQueryParams } from '@/types';

import { getCategories, getPost, getPosts, QUERY_KEYS } from './api';

export const postsQueryOptions = (params: PostsQueryParams) => {
  return queryOptions({
    queryKey: [QUERY_KEYS.POSTS, params],
    queryFn: () => getPosts(params),
    placeholderData: keepPreviousData,
  });
};

export const postQueryOptions = (params: PostQueryParams) => {
  return queryOptions({
    queryKey: [QUERY_KEYS.POST, params.id],
    queryFn: () => getPost({ id: params.id }),
    placeholderData: keepPreviousData,
    retry: false,
  });
};

export const categoryQueryOptions = () => {
  return queryOptions({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: getCategories,
    placeholderData: keepPreviousData,
    staleTime: 24 * 60 * 60 * 1000,
  });
};
