export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: Date;
  category: Category;
  tag: Tag;
  media: Media;
}

export interface MediaFile {
  id: number;
  mediaId: number;
  file: string;
  shortDescription: string | null;
  size: number;
  position: number;
}

export interface Media {
  id: number;
  shortDescription: string | null;
  shortSlug: string;
  folder: string;
  type: number;
  status: number;
  updatedAt: string;
  mediaFiles: MediaFile[];
}

export interface Category {
  id: string;
  name: string;
  postCount: number;
}

export interface Tag {
  id: string;
  name: string;
  postCount: number;
}

export type PostsQueryParams = {
  page: number;
  category: string;
};

export type PostQueryParams = {
  id: string;
};

export interface Paginated<T> {
  content: T[];
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}
