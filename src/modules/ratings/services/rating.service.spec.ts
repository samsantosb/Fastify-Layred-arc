import ratingService from "./rating.service";
import ratingRepository from "../repositories/rating.repository";
import { err, success } from "../../../shared/api-patterns/return-patterns";
import userService from "../../users/services/user.service";
import postService from "../../posts/services/post.service";
jest.mock("../repositories/rating.repository");
jest.mock("../../users/services/user.service");
jest.mock("../../posts/services/post.service");

const mockedRatingRepository = ratingRepository as jest.Mocked<
  typeof ratingRepository
>;
const mockedUserService = userService as jest.Mocked<typeof userService>;
const mockedPostService = postService as jest.Mocked<typeof postService>;

describe("Rating Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getById", () => {
    it("should return success with the rating if found", async () => {
      const mockRating = {
        id: "1",
        user: "1",
        post: "1",
        rating: 5,
      };
      const mockUser = {
        id: "1",
        name: "Test User",
        email: "test.user@email.com",
      };
      const mockPost = {
        id: "1",
        title: "Test Post",
        description: "Description",
        category: "Category",
        thumbnailUrl: "https://example.com/thumbnail.jpg",
        contentUrl: "https://example.com/content.jpg",
      };

      mockedRatingRepository.getById.mockResolvedValue(mockRating);
      mockedUserService.getById.mockResolvedValue(success(mockUser));
      mockedPostService.getById.mockResolvedValue(
        success({
          id: "1",
          title: "Test Post",
          description: "Description",
          category: "Category",
          thumbnailUrl: "https://example.com/thumbnail.jpg",
          contentUrl: "https://example.com/content.jpg",
        })
      );

      const result = await ratingService.getById("1");

      expect(result).toEqual(success({ ...mockRating, user: mockUser, post: mockPost }));
    });
  });

  describe("create", () => {
    it("should return success with the created rating", async () => {
      const mockRating = {
        id: "1",
        user: "1",
        post: "1",
        rating: 5,
      };

      mockedRatingRepository.create.mockResolvedValue(mockRating);

      const result = await ratingService.create({
        user: "1",
        post: "1",
        rating: 5,
      });

      expect(result).toEqual(success(mockRating));
    });
  });

  describe("update", () => {
    it("should return success with the updated rating", async () => {
      const mockRating = {
        id: "1",
        user: "1",
        post: "1",
        rating: 5,
      };

      mockedRatingRepository.update.mockResolvedValue(mockRating);

      const result = await ratingService.update("1", {
        rating: 5,
      });

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
