import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { ENDPOINTS, fetcher, getPost } from "./api";
import type { Post, PostQueryParams, PostsQueryParams, Paginated } from "@/types";

export const postsQueryOptions = (params: PostsQueryParams) => {
  return queryOptions({
    queryKey: [ENDPOINTS.POSTS, params],
    queryFn: () => fetcher<Paginated<Post>, PostsQueryParams>(ENDPOINTS.POSTS, params),
    placeholderData: keepPreviousData,
  });
};

export const postQueryOptions = (params: PostQueryParams) => {
  return queryOptions({
    queryKey: [ENDPOINTS.POST, params.id],
    queryFn: () => getPost({ id: params.id }),
    placeholderData: keepPreviousData,
    retry: false
  });
};
