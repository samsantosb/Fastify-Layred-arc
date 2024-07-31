"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const return_patterns_1 = require("../../../shared/api-patterns/return-patterns");
const error_messages_1 = require("../../../shared/errorHandler/enums/error-messages");
const error_names_1 = require("../../../shared/errorHandler/enums/error-names");
// Mocking the userRepository module
jest.mock("../repositories/user.repository");
const mockedUserRepository = user_repository_1.default;
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
            const result = await user_service_1.default.getAll();
            expect(result).toEqual((0, return_patterns_1.success)(mockUsers));
        });
    });
    describe("getById", () => {
        it("should return success with the user if found", async () => {
            const mockUser = {
                id: "1",
                email: "test1@example.com",
                name: "Test User 1",
                password: "password", // Adicionando a propriedade password
            };
            mockedUserRepository.getById.mockResolvedValue(mockUser);
            const result = await user_service_1.default.getById("1");
            expect(result).toEqual((0, return_patterns_1.success)(mockUser));
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
            const result = await user_service_1.default.create({
                email: "test1@example.com",
                password: "password",
                name: "Test User 1",
            });
            expect(result).toEqual((0, return_patterns_1.success)(mockUser));
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
            const result = await user_service_1.default.update("1", { password: "newpassword" });
            expect(result).toEqual((0, return_patterns_1.success)(mockUser));
        });
        it("should return an error if user cannot be updated", async () => {
            mockedUserRepository.update.mockResolvedValue(null);
            const result = await user_service_1.default.update("1", { password: "newpassword" });
            expect(result).toEqual((0, return_patterns_1.err)(error_messages_1.errorMessages.INTERNAL_SERVER_ERROR, expect.any(String), error_names_1.errorNames.CANNOT_UPDATE));
        });
    });
    describe("softDelete", () => {
        it("should return success when the user is soft deleted", async () => {
            mockedUserRepository.softDelete.mockResolvedValue(null);
            const result = await user_service_1.default.softDelete("1");
            expect(result).toEqual((0, return_patterns_1.success)(null));
        });
    });
});
