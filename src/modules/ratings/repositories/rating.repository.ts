import { Rating } from "../models/domain.rating.type";
import { mongooseRating } from "../models/mongoose.rating.model";

const getById = async (id: string): Promise<Rating | null> => {
  const rating = await mongooseRating.findById(id);

  if (!rating) {
    return null;
  }

  const {
    _id,
    user,
    post,
    rating: ratingValue,
    isDeleted,
    updatedAt,
    createdAt,
  } = rating;

  return {
    id: String(_id),
    user: String(user),
    post: String(post),
    rating: ratingValue,
    isDeleted,
    updatedAt,
    createdAt,
  };
};

const create = async (rating: {
  user: string;
  post: string;
  rating: number;
}): Promise<Rating> => {
  const createdRating = await mongooseRating.create(rating);
  return {
    id: String(createdRating._id),
    user: rating.user,
    post: rating.post,
    rating: createdRating.rating,
    isDeleted: createdRating.isDeleted,
    updatedAt: createdRating.updatedAt,
    createdAt: createdRating.createdAt,
  };
};

const update = async (
  id: string,
  rating: { rating: number }
): Promise<Rating | null> => {
  const updatedRating = await mongooseRating
    .findByIdAndUpdate(id, rating, {
      new: true,
    })
    .exec();

  if (!updatedRating) {
    return null;
  }

  return {
    id: String(updatedRating._id),
    user: String(updatedRating.user),
    post: String(updatedRating.post),
    rating: updatedRating.rating,
    isDeleted: updatedRating.isDeleted,
    updatedAt: updatedRating.updatedAt,
    createdAt: updatedRating.createdAt,
  };
};

const softDelete = async (id: string): Promise<Rating | null> => {
  const deletedRating = await mongooseRating
    .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    .exec();

  if (!deletedRating) {
    return null;
  }

  return {
    id: String(deletedRating._id),
    user: String(deletedRating.user),
    post: String(deletedRating.post),
    rating: deletedRating.rating,
    isDeleted: deletedRating.isDeleted,
    updatedAt: deletedRating.updatedAt,
    createdAt: deletedRating.createdAt,
  };
};

export default {
  getById,
  create,
  update,
  softDelete,
};
