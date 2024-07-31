"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_user_model_1 = require("../models/mongoose.user.model");
const getAll = async () => {
    const users = await mongoose_user_model_1.mongooseUser.find();
    return users.map(({ _id, email, name, password, isDeleted, updatedAt, createdAt }) => ({
        id: String(_id),
        email,
        name,
        password,
        isDeleted,
        updatedAt,
        createdAt,
    }));
};
const getByEmail = async (email) => {
    const user = await mongoose_user_model_1.mongooseUser.findOne({ email });
    if (!user) {
        return null;
    }
    const { _id, name, password, isDeleted, updatedAt, createdAt } = user;
    return {
        id: String(_id),
        email,
        name,
        password,
        isDeleted,
        updatedAt,
        createdAt,
    };
};
const getById = async (id) => {
    const user = await mongoose_user_model_1.mongooseUser.findOne({ _id: id });
    if (!user) {
        return null;
    }
    const { _id, email, name, password, isDeleted, updatedAt, createdAt } = user;
    return {
        id: String(_id),
        email,
        name,
        password,
        isDeleted,
        updatedAt,
        createdAt,
    };
};
const create = async (user) => {
    const createdUser = await mongoose_user_model_1.mongooseUser.create(user);
    return {
        id: String(createdUser._id),
        email: createdUser.email,
        name: createdUser.name,
        password: createdUser.password,
        isDeleted: createdUser.isDeleted,
        updatedAt: createdUser.updatedAt,
        createdAt: createdUser.createdAt,
    };
};
const update = async (id, user) => {
    const updatedUser = await mongoose_user_model_1.mongooseUser
        .findByIdAndUpdate(id, user, {
        new: true,
    })
        .exec();
    if (!updatedUser) {
        return null;
    }
    return {
        id: String(updatedUser._id),
        email: updatedUser.email,
        name: updatedUser.name,
        password: updatedUser.password,
        isDeleted: updatedUser.isDeleted,
        updatedAt: updatedUser.updatedAt,
        createdAt: updatedUser.createdAt,
    };
};
const softDelete = async (id) => {
    const user = await mongoose_user_model_1.mongooseUser
        .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
        .exec();
    if (!user) {
        return null;
    }
    return {
        id: String(user._id),
        email: user.email,
        name: user.name,
        password: user.password,
        isDeleted: user.isDeleted,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
    };
};
exports.default = {
    getByEmail,
    getAll,
    getById,
    create,
    update,
    softDelete,
};
