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
      email: "doctor.robotnik@example.com",
      password: await encryptPassword("supersecretpassword"),
      name: "Dr. Robotnik",
    });

    await user.save();

    // Post
    const post = new Post({
      title: "Speeding Through Green Hill Zone: Complete Guide",
      description:
        "Uncover all the secrets and fastest paths in Green Hill Zone.",
      category: "Gaming",
      thumbnailUrl: "https://example.com/images/sonic-thumbnail.jpg",
      contentUrl: "https://example.com/articles/sonic-guide",
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
