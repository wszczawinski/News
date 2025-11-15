export interface Post {
  id: string;
  title: string;
  shortDescription: string;
  slug: string;
  content: string;
  createdAt: Date;
  category: Category;
  tag: Tag;
  media: Media;
  thumbnail: string;
}

export interface MediaFile {
  file: string;
  thumbnail165: string;
  thumbnail600: string;
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
