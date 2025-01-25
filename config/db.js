const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Use MongoDB Atlas connection string
    await mongoose.connect("mongodb+srv://jamiraza361:kVtfxuYzHJvR8NwO@cluster0.4bisd.mongodb.net/blog", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
