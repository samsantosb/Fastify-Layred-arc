"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_rating_model_1 = require("../models/mongoose.rating.model");
const getById = async (id) => {
    const rating = await mongoose_rating_model_1.mongooseRating.findById(id);
    if (!rating) {
        return null;
    }
    const { _id, user, post, rating: ratingValue, isDeleted, updatedAt, createdAt, } = rating;
    return {
        id: String(_id),
        user: String(user),
        post: String(post),
        rating: ratingValue,
        isDeleted,
        updatedAt,
        createdAt,
    };
};
const getAllByUserId = async (userId) => {
    const ratings = await mongoose_rating_model_1.mongooseRating.find({ user: userId });
    return ratings.map(({ _id, post, rating, isDeleted, updatedAt, createdAt }) => ({
        id: String(_id),
        user: userId,
        post: String(post),
        rating,
        isDeleted,
        updatedAt,
        createdAt,
    }));
};
const getAllByPostId = async (postId) => {
    const rating = await mongoose_rating_model_1.mongooseRating.findOne({ post: postId });
    if (!rating) {
        return null;
    }
    const { _id, rating: ratingValue, isDeleted, updatedAt, createdAt, user, } = rating;
    return {
        id: String(_id),
        post: postId,
        user: String(user),
        rating: ratingValue,
        isDeleted,
        updatedAt,
        createdAt,
    };
};
const create = async (rating) => {
    const createdRating = await mongoose_rating_model_1.mongooseRating.create(rating);
    return {
        id: String(createdRating._id),
        user: rating.user,
        post: rating.post,
        rating: createdRating.rating,
        isDeleted: createdRating.isDeleted,
        updatedAt: createdRating.updatedAt,
        createdAt: createdRating.createdAt,
    };
};
const update = async (id, rating) => {
    const updatedRating = await mongoose_rating_model_1.mongooseRating
        .findByIdAndUpdate(id, rating, {
        new: true,
    })
        .exec();
    if (!updatedRating) {
        return null;
    }
    return {
        id: String(updatedRating._id),
        user: String(updatedRating.user),
        post: String(updatedRating.post),
        rating: updatedRating.rating,
        isDeleted: updatedRating.isDeleted,
        updatedAt: updatedRating.updatedAt,
        createdAt: updatedRating.createdAt,
    };
};
const softDelete = async (id) => {
    const deletedRating = await mongoose_rating_model_1.mongooseRating
        .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
        .exec();
    if (!deletedRating) {
        return null;
    }
    return {
        id: String(deletedRating._id),
        user: String(deletedRating.user),
        post: String(deletedRating.post),
        rating: deletedRating.rating,
        isDeleted: deletedRating.isDeleted,
        updatedAt: deletedRating.updatedAt,
        createdAt: deletedRating.createdAt,
    };
};
exports.default = {
    getById,
    getAllByUserId,
    getAllByPostId,
    create,
    update,
    softDelete,
};
