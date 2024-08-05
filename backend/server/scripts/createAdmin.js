const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createOrUpdateAdmin = async () => {
  try {
    const name = "admin";
    const rollNo = "admin-roll-no";
    const email = "admin@gmail.com";
    const password = "adminadmin";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      existingUser.password = hashedPassword;
      existingUser.isAdmin = true;
      await existingUser.save();
      console.log("Admin user updated:", existingUser);
    } else {
      const newAdmin = await User.create({
        name,
        rollNo,
        email,
        password: hashedPassword,
        isAdmin: true,
      });
      console.log("Admin user created:", newAdmin);
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating or updating admin:", error);
    mongoose.connection.close();
  }
};

createOrUpdateAdmin();
