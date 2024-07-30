export type Rating = {
  id: string;
  user: string;
  post: string;
  rating: number;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}