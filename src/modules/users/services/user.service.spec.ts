import userService from "./user.service";
import userRepository from "../repositories/user.repository";
import { err, success } from "../../../shared/api-patterns/return-patterns";
import { errorMessages } from "../../../shared/errorHandler/enums/error-messages";
import { errorNames } from "../../../shared/errorHandler/enums/error-names";

// Mocking the userRepository module
jest.mock("../repositories/user.repository");

const mockedUserRepository = userRepository as jest.Mocked<
  typeof userRepository
>;

describe("User Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should return success with all users", async () => {
      const mockUsers = [
        {
          id: "1",
          email: "test1@example.com",
          name: "Test User 1",
          password: "password",
        },
        {
          id: "2",
          email: "test2@example.com",
          name: "Test User 2",
          password: "password",
        },
      ];
      mockedUserRepository.getAll.mockResolvedValue(mockUsers);

      const result = await userService.getAll();
      expect(result).toEqual(success(mockUsers));
    });
  });

  describe("getById", () => {
    it("should return success with the user if found", async () => {
      const mockUser = {
        id: "1",
        email: "test1@example.com",
        name: "Test User 1",
        password: "password",
      };
      mockedUserRepository.getById.mockResolvedValue(mockUser);

      const result = await userService.getById("1");
      const { password, ...user } = mockUser;
      expect(result).toEqual(success(user));
    });
  });

  describe("create", () => {
    it("should return success with the created user", async () => {
      const mockUser = {
        id: "1",
        email: "test1@example.com",
        name: "Test User 1",
        password: "password",
      };
      mockedUserRepository.create.mockResolvedValue(mockUser);

      const result = await userService.create({
        email: "test1@example.com",
        password: "password",
        name: "Test User 1",
      });

      const { password, ...user } = mockUser;

      expect(result).toEqual(success(user));
    });
  });

  describe("update", () => {
    it("should return success with the updated user", async () => {
      const mockUser = {
        id: "1",
        email: "test1@example.com",
        name: "Test User 1",
        password: "newpassword",
      };
      mockedUserRepository.update.mockResolvedValue(mockUser);

      const result = await userService.update("1", { password: "newpassword" });
      expect(result).toEqual(success(mockUser));
    });

    it("should return an error if user cannot be updated", async () => {
      mockedUserRepository.update.mockResolvedValue(null);

      const result = await userService.update("1", { password: "newpassword" });
      expect(result).toEqual(
        err(
          errorMessages.INTERNAL_SERVER_ERROR,
          expect.any(String),
          errorNames.CANNOT_UPDATE
        )
      );
    });
  });

  describe("softDelete", () => {
    it("should return success when the user is soft deleted", async () => {
      mockedUserRepository.softDelete.mockResolvedValue(null);

      const result = await userService.softDelete("1");
      expect(result).toEqual(success(null));
    });
  });
});
