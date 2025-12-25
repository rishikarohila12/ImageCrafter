import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Database connected");
  } catch (error) {
    console.log("❌ Database connection error:", error.message);
  }

  // Optional: listen for future errors
  mongoose.connection.on("error", (err) => {
    console.log("Mongoose connection error ❌:", err);
  });
};

export default connectDB;
