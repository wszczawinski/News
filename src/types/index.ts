export interface Post {
  id: number;
  title: string;
  shortDescription: string;
  slug: string;
  content: string;
  createdAt: Date;
  categoryId: number;
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
  id: number;
  name: string;
  slug: string;
  position: number;
}

export type PostsQueryParams = {
  page: number;
  category: number | null;
};

export type PostQueryParams = {
  id: number;
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

export const BannerType = {
  1: 'Hero',
  2: 'Post_1',
  3: 'Post_2',
  4: 'Post_3',
  5: 'Local',
  6: 'Ads',
  7: 'Recomends',
} as const;

export type BannerTypeKey = keyof typeof BannerType;

export interface Banner {
  id: number;
  name: string;
  link: string;
  image: string;
  imageThumbnail20: string;
  imageThumbnail600: string;
  type: BannerTypeKey;
  width: number;
  height: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
