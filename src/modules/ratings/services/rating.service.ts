import { err, success } from "../../../shared/api-patterns/return-patterns";
import { errorMessages } from "../../../shared/errorHandler/enums/error-messages";
import { errorNames } from "../../../shared/errorHandler/enums/error-names";
import { getStackTrace } from "../../../shared/errorHandler/stackTrace/get-stack-trace";
import postService from "../../posts/services/post.service";
import userService from "../../users/services/user.service";
import ratingRepository from "../repositories/rating.repository";

const getById = async (id: string) => {
  const rating = await ratingRepository.getById(id);

  if (!rating) {
    return err(
      errorMessages.INTERNAL_SERVER_ERROR,
      getStackTrace(),
      errorNames.NOT_FOUND
    );
  }

  const [userErr, user] = await userService.getById(rating.user);
  const [postErr, post] = await postService.getById(rating.post);

  const ratingWithUserAndPost = {
    ...rating,
    user,
    post,
  };

  return success(ratingWithUserAndPost);
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
  getById,
  create,
  update,
  softDelete,
};
