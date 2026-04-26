import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import type { Media, PostQueryParams, PostsQueryParams } from '@/types';

import { getBanners, getCategories, getPost, getPosts, QUERY_KEYS } from './api';

const sortMediaFiles = (media: Media): Media => ({
  ...media,
  mediaFiles: [...media.mediaFiles].sort((a, b) => a.file.localeCompare(b.file)),
});

const selectPosts = (data: Awaited<ReturnType<typeof getPosts>>) => ({
  ...data,
  content: data.content.map(post => ({ ...post, media: sortMediaFiles(post.media) })),
});

const selectPost = (post: Awaited<ReturnType<typeof getPost>>) => ({
  ...post,
  media: sortMediaFiles(post.media),
});

export const postsQueryOptions = (params: PostsQueryParams) => {
  return queryOptions({
    queryKey: [QUERY_KEYS.POSTS, params],
    queryFn: ({ signal }) => getPosts({ ...params, signal }),
    placeholderData: keepPreviousData,
    select: selectPosts,
    staleTime: 5 * 60 * 1000, // 5min
  });
};

export const postQueryOptions = (params: PostQueryParams) => {
  return queryOptions({
    queryKey: [QUERY_KEYS.POST, params.id],
    queryFn: ({ signal }) => getPost({ id: params.id, signal }),
    placeholderData: keepPreviousData,
    select: selectPost,
    staleTime: 30 * 60 * 1000, // 30min
  });
};

export const categoryQueryOptions = () => {
  return queryOptions({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: ({ signal }) => getCategories({ signal }),
    placeholderData: keepPreviousData,
    staleTime: 24 * 60 * 60 * 1000, // 24h
  });
};

export const bannersQueryOptions = () => {
  return queryOptions({
    queryKey: [QUERY_KEYS.BANNERS],
    queryFn: ({ signal }) => getBanners({ signal }),
    placeholderData: keepPreviousData,
    staleTime: 60 * 60 * 1000, // 60min
  });
};
