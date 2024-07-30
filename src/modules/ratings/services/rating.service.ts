import { err, success } from "../../../shared/api-patterns/return-patterns";
import { errorMessages } from "../../../shared/errorHandler/enums/error-messages";
import { errorNames } from "../../../shared/errorHandler/enums/error-names";
import { getStackTrace } from "../../../shared/errorHandler/stackTrace/get-stack-trace";
import ratingRepository from "../repositories/rating.repository";

const getAllByUserId = async (userId: string) => {
  const ratings = await ratingRepository.getAllByUserId(userId);

  return success(ratings);
};

const getAllByPostId = async (id: string) => {
  const rating = await ratingRepository.getAllByPostId(id);

  return success(rating);
};

const getById = async (id: string) => {
  const rating = await ratingRepository.getById(id);

  return success(rating);
};

const create = async (rating: {
  user: string;
  post: string;
  rating: number;
}) => {
  const createdRating = await ratingRepository.create(rating);

  return success(createdRating);
};

const update = async (id: string, rating: { rating: number }) => {
  const updatedRating = await ratingRepository.update(id, rating);

  if (!updatedRating) {
    return err(
      errorMessages.INTERNAL_SERVER_ERROR,
      getStackTrace(),
      errorNames.CANNOT_UPDATE
    );
  }

  return success(updatedRating);
};

const softDelete = async (id: string) => {
  await ratingRepository.softDelete(id);

  return success(null);
};

export default {
  getAllByUserId,
  getAllByPostId,
  getById,
  create,
  update,
  softDelete,
};
