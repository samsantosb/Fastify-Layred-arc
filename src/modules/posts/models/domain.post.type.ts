export type Post = {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  contentUrl: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
