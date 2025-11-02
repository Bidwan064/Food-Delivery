import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

// config
dotenv.config();

// MongoDB connect
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// User model import (make sure path sahi ho)
import User from "./models/userModel.js";

const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      isAdmin: true   
    });

    await admin.save();
    console.log("✅ Admin user created successfully!");
    mongoose.disconnect();
  } catch (error) {
    console.log("❌ Error creating admin:", error.message);
    mongoose.disconnect();
  }
};

createAdmin();
