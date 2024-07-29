export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
