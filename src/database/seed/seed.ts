import mongoose, { Schema, Document, Model } from "mongoose";
import { mongooseUser as User } from "../../modules/users/models/mongoose.user.model";
import { mongoosePost as Post } from "../../modules/posts/models/mongoose.post.model";
import { mongooseRating as Rating } from "../../modules/ratings/models/mongoose.rating.model";
import { encryptPassword } from "../../modules/auth/services/auth.service";

// Connect to database and seed data
const seedDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydatabase");

    console.log("Database connected");

    // Clear all collections
    await User.deleteMany({});
    await Post.deleteMany({});
    await Rating.deleteMany({});

    // User
    const user = new User({
      email: "user@example.com",
      password: await encryptPassword("password123"),
      name: "John Doe",
    });

    await user.save();

    // Post
    const post = new Post({
      title: "Título do Post",
      description: "Descrição do Post",
      category: "Categoria do Post",
      thumbnailUrl: "http://exemplo.com/thumbnail.jpg",
      contentUrl: "http://exemplo.com/content.jpg",
    });

    await post.save();

    // Rating
    const rating = new Rating({
      user: user._id,
      post: post._id,
      rating: 5,
    });

    await rating.save();

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();
