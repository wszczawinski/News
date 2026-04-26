import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import type { Media, PostQueryParams, PostsQueryParams } from '@/types';

import { getBanners, getCategories, getPost, getPosts, QUERY_KEYS } from './api';

const sortMediaFiles = (media: Media): Media => ({
  ...media,
  mediaFiles: [...media.mediaFiles].sort((a, b) => a.file.localeCompare(b.file)),
});

const selectPosts = (data: Awaited<ReturnType<typeof getPosts>>) => ({
  ...data,
  content: data.content.map(post => ({ ...post, media: post.media ? sortMediaFiles(post.media) : null })),
});

const selectPost = (post: Awaited<ReturnType<typeof getPost>>) => ({
  ...post,
  media: post.media ? sortMediaFiles(post.media) : null,
});

export const postsQueryOptions = (params: PostsQueryParams) => {
  return queryOptions({
    queryKey: [QUERY_KEYS.POSTS, params],
    queryFn: () => getPosts(params),
    placeholderData: keepPreviousData,
    select: selectPosts,
    staleTime: 5 * 60 * 1000, // 5min
  });
};

export const postQueryOptions = (params: PostQueryParams) => {
  return queryOptions({
    queryKey: [QUERY_KEYS.POST, params.id],
    queryFn: () => getPost({ id: params.id }),
    placeholderData: keepPreviousData,
    select: selectPost,
    staleTime: 30 * 60 * 1000, // 30min
  });
};

export const categoryQueryOptions = () => {
  return queryOptions({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: getCategories,
    placeholderData: keepPreviousData,
    staleTime: 24 * 60 * 60 * 1000, // 24h
  });
};

export const bannersQueryOptions = () => {
  return queryOptions({
    queryKey: [QUERY_KEYS.BANNERS],
    queryFn: getBanners,
    placeholderData: keepPreviousData,
    staleTime: 60 * 60 * 1000, // 60min
  });
};
