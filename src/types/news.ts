export type NewsFilterParams = {
  page: number;
  search?: string;
  is_published?: number;
};

export type News = {
  id: number;
  image_url?: string | null;
  title: string;
  content: string;
  published_on: string;
  is_published: number;
  url_link?: string | null;
  created_by: number;
  created_at: string;
};

export type NewsFormFields = {
  image?: string | null;
  title: string;
  content: string;
  published_on: Date | string;
  is_published: number;
  url_link?: string | null;
};
