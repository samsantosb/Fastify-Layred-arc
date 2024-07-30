import postService from './post.service';
import postRepository from '../repositories/post.repository';
import { err, success } from '../../../shared/api-patterns/return-patterns';

jest.mock('../repositories/post.repository');

const mockedPostRepository = postRepository as jest.Mocked<typeof postRepository>;

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

      const result = await postService.getAll();
      expect(result).toEqual(success(mockPosts));
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

      const result = await postService.getById('1');
      expect(result).toEqual(success(mockPost));
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

      const result = await postService.create(mockPost);
      expect(result).toEqual(success(mockPost));
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

      const result = await postService.update('1', mockPost);
      expect(result).toEqual(success(mockPost));
    });
  });

  describe('softDelete', () => {
    it('should return success with null', async () => {
      mockedPostRepository.softDelete.mockResolvedValue(null);

      const result = await postService.softDelete('1');
      expect(result).toEqual(success(null));
    });
  });
});