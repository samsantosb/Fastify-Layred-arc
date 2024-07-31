"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_post_model_1 = require("../models/mongoose.post.model");
const getAll = async () => {
    const posts = await mongoose_post_model_1.mongoosePost.find();
    return posts.map(({ _id, title, description, category, thumbnailUrl, contentUrl, isDeleted, updatedAt, createdAt, }) => ({
        id: String(_id),
        title,
        description,
        category,
        thumbnailUrl,
        contentUrl,
        isDeleted,
        updatedAt,
        createdAt,
    }));
};
const getById = async (id) => {
    const post = await mongoose_post_model_1.mongoosePost.findOne({ _id: id });
    if (!post) {
        return null;
    }
    const { _id, title, description, category, thumbnailUrl, contentUrl, isDeleted, updatedAt, createdAt, } = post;
    return {
        id: String(_id),
        title,
        description,
        category,
        thumbnailUrl,
        contentUrl,
        isDeleted,
        updatedAt,
        createdAt,
    };
};
const create = async (post) => {
    const createdPost = await mongoose_post_model_1.mongoosePost.create(post);
    return {
        id: String(createdPost._id),
        title: createdPost.title,
        description: createdPost.description,
        category: createdPost.category,
        thumbnailUrl: createdPost.thumbnailUrl,
        contentUrl: createdPost.contentUrl,
        isDeleted: createdPost.isDeleted,
        updatedAt: createdPost.updatedAt,
        createdAt: createdPost.createdAt,
    };
};
const update = async (id, post) => {
    const updatedPost = await mongoose_post_model_1.mongoosePost
        .findByIdAndUpdate(id, post, {
        new: true,
    })
        .exec();
    if (!updatedPost) {
        return null;
    }
    return {
        id: String(updatedPost._id),
        title: updatedPost.title,
        description: updatedPost.description,
        category: updatedPost.category,
        thumbnailUrl: updatedPost.thumbnailUrl,
        contentUrl: updatedPost.contentUrl,
        isDeleted: updatedPost.isDeleted,
        updatedAt: updatedPost.updatedAt,
        createdAt: updatedPost.createdAt,
    };
};
const softDelete = async (id) => {
    const deletedPost = await mongoose_post_model_1.mongoosePost
        .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
        .exec();
    if (!deletedPost) {
        return null;
    }
    return {
        id: String(deletedPost._id),
        title: deletedPost.title,
        description: deletedPost.description,
        category: deletedPost.category,
        thumbnailUrl: deletedPost.thumbnailUrl,
        contentUrl: deletedPost.contentUrl,
        isDeleted: deletedPost.isDeleted,
        updatedAt: deletedPost.updatedAt,
        createdAt: deletedPost.createdAt,
    };
};
exports.default = {
    getAll,
    getById,
    create,
    update,
    softDelete,
};
