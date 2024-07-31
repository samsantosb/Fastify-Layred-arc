"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingDTO = ratingDTO;
const z = __importStar(require("zod"));
const mongoose_id_dto_1 = require("../../../shared/dtos/mongoose-id.dto");
const ratingSchema = z.object({
    rating: z
        .number()
        .int()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be at most 5"),
    post: z.string().refine(mongoose_id_dto_1.mongooseIdDTO, "Invalid post ID"),
    user: z.string().refine(mongoose_id_dto_1.mongooseIdDTO, "Invalid user ID"),
});
function ratingDTO(rating) {
    const parsedRating = ratingSchema.parse(rating);
    return parsedRating;
}
