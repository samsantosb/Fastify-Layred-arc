"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rating_service_1 = __importDefault(require("./rating.service"));
const rating_repository_1 = __importDefault(require("../repositories/rating.repository"));
const return_patterns_1 = require("../../../shared/api-patterns/return-patterns");
jest.mock("../repositories/rating.repository");
const mockedRatingRepository = rating_repository_1.default;
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
            const result = await rating_service_1.default.getAllByUserId("1");
            expect(result).toEqual((0, return_patterns_1.success)(mockRatings));
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
            const result = await rating_service_1.default.getAllByPostId("1");
            expect(result).toEqual((0, return_patterns_1.success)(mockRating));
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
            const result = await rating_service_1.default.getById("1");
            expect(result).toEqual((0, return_patterns_1.success)(mockRating));
        });
    });
    describe("softDelete", () => {
        it("should return success with null", async () => {
            mockedRatingRepository.softDelete.mockResolvedValue(null);
            const result = await rating_service_1.default.softDelete("1");
            expect(result).toEqual((0, return_patterns_1.success)(null));
        });
    });
});
