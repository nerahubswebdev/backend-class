import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please i need the name"],
    },
    image: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      required: [true, "Please i need the bio"],
    },
    social: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please i need the email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please i need the password"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
