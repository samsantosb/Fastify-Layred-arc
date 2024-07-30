import ratingService from './rating.service';
import ratingRepository from '../repositories/rating.repository';
import { statusCode } from '../../../shared/statusCode/status-code';
import { err, success } from "../../../shared/api-patterns/return-patterns";
import { errorMessages } from "../../../shared/errorHandler/enums/error-messages";
import { errorNames } from "../../../shared/errorHandler/enums/error-names";

jest.mock("../repositories/rating.repository");

const mockedRatingRepository = ratingRepository as jest.Mocked<
  typeof ratingRepository
>;

describe("Rating Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllByUserId", () => {
    it("should return success with all ratings by user id", async () => {
      const mockRatings = [
        {
          id: "1",
          user: "1",
          post: "1",
          rating: 5,
        },
        {
          id: "2",
          user: "1",
          post: "2",
          rating: 4,
        },
      ];
      mockedRatingRepository.getAllByUserId.mockResolvedValue(mockRatings);

      const result = await ratingService.getAllByUserId("1");
      expect(result).toEqual(success(mockRatings));
    });
  });

  describe("getAllByPostId", () => {
    it("should return success with all ratings by post id", async () => {
      const mockRating = {
        id: "1",
        user: "1",
        post: "1",
        rating: 5,
      };
      mockedRatingRepository.getAllByPostId.mockResolvedValue(mockRating);

      const result = await ratingService.getAllByPostId("1");
      expect(result).toEqual(success(mockRating));
    });
  });

  describe("getById", () => {
    it("should return success with the rating if found", async () => {
      const mockRating = {
        id: "1",
        user: "1",
        post: "1",
        rating: 5,
      };
      mockedRatingRepository.getById.mockResolvedValue(mockRating);

      const result = await ratingService.getById("1");

      expect(result).toEqual(success(mockRating));
    });
  });

  describe("softDelete", () => {
    it("should return success with null", async () => {
      mockedRatingRepository.softDelete.mockResolvedValue(null);

      const result = await ratingService.softDelete("1");

      expect(result).toEqual(success(null));
    });
  });
});