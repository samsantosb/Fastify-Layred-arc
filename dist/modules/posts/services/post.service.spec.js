"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_service_1 = __importDefault(require("./post.service"));
const post_repository_1 = __importDefault(require("../repositories/post.repository"));
const return_patterns_1 = require("../../../shared/api-patterns/return-patterns");
jest.mock('../repositories/post.repository');
const mockedPostRepository = post_repository_1.default;
describe('Post Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('getAll', () => {
        it('should return success with all posts', async () => {
            const mockPosts = [
                {
                    id: '1',
                    title: 'Test Post 1',
                    description: 'Description 1',
                    category: 'Category 1',
                    thumbnailUrl: 'https://example.com/thumbnail1.jpg',
                    contentUrl: 'https://example.com/content1.jpg',
                },
                {
                    id: '2',
                    title: 'Test Post 2',
                    description: 'Description 2',
                    category: 'Category 2',
                    thumbnailUrl: 'https://example.com/thumbnail2.jpg',
                    contentUrl: 'https://example.com/content2.jpg',
                },
            ];
            mockedPostRepository.getAll.mockResolvedValue(mockPosts);
            const result = await post_service_1.default.getAll();
            expect(result).toEqual((0, return_patterns_1.success)(mockPosts));
        });
    });
    describe('getById', () => {
        it('should return success with the post if found', async () => {
            const mockPost = {
                id: '1',
                title: 'Test Post 1',
                description: 'Description 1',
                category: 'Category 1',
                thumbnailUrl: 'https://example.com/thumbnail1.jpg',
                contentUrl: 'https://example.com/content1.jpg',
            };
            mockedPostRepository.getById.mockResolvedValue(mockPost);
            const result = await post_service_1.default.getById('1');
            expect(result).toEqual((0, return_patterns_1.success)(mockPost));
        });
    });
    describe('create', () => {
        it('should return success with the created post', async () => {
            const mockPost = {
                id: '1',
                title: 'Test Post 1',
                description: 'Description 1',
                category: 'Category 1',
                thumbnailUrl: 'https://example.com/thumbnail1.jpg',
                contentUrl: 'https://example.com/content1.jpg',
            };
            mockedPostRepository.create.mockResolvedValue(mockPost);
            const result = await post_service_1.default.create(mockPost);
            expect(result).toEqual((0, return_patterns_1.success)(mockPost));
        });
    });
    describe('update', () => {
        it('should return success with the updated post', async () => {
            const mockPost = {
                id: '1',
                title: 'Test Post 1',
                description: 'Description 1',
                category: 'Category 1',
                thumbnailUrl: 'https://example.com/thumbnail1.jpg',
                contentUrl: 'https://example.com/content1.jpg',
            };
            mockedPostRepository.update.mockResolvedValue(mockPost);
            const result = await post_service_1.default.update('1', mockPost);
            expect(result).toEqual((0, return_patterns_1.success)(mockPost));
        });
    });
    describe('softDelete', () => {
        it('should return success with null', async () => {
            mockedPostRepository.softDelete.mockResolvedValue(null);
            const result = await post_service_1.default.softDelete('1');
            expect(result).toEqual((0, return_patterns_1.success)(null));
        });
    });
});
