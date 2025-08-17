import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
      validate: {
        validator: (v) => /^[a-zA-Z\s]+$/.test(v),
        message: "Name should contain only letters and spaces",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 100,
      set: (value) => bcrypt.hashSync(value, bcrypt.genSaltSync(12)),
    },
    contact: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v) => /^[0-9]{10}$/.test(v),
        message: "Contact must be a 10-digit number",
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    badges: [
      {
        badgename: { type: String, default: "New" },
        badgeImage: {
          type: String,
          default: "https://example.com/default-badge.png",
        },
      },
    ],
    profile: {
      country: { type: String, default: "India" },
      dob: { type: Date, default: null },
      bio: {
        type: String,
        maxlength: 300,
        default: "This user hasn't written a bio yet.",
      },
      designation: { type: String, default: "Cultural Enthusiast" },
      profileImage: {
        type: String,
        default: "https://example.com/default-profile.png",
      },
      socialLinks: {
        linkedin: {
          type: String,
          default: "",
          validate: (v) =>
            v === "" || /^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(v),
        },
        twitter: {
          type: String,
          default: "",
          validate: (v) =>
            v === "" || /^https?:\/\/(www\.)?twitter\.com\/.*$/.test(v),
        },
        facebook: {
          type: String,
          default: "",
          validate: (v) =>
            v === "" || /^https?:\/\/(www\.)?facebook\.com\/.*$/.test(v),
        },
        instagram: {
          type: String,
          default: "",
          validate: (v) =>
            v === "" || /^https?:\/\/(www\.)?instagram\.com\/.*$/.test(v),
        },
      },
    },
  },
  { timestamps: true, versionKey: false }
);

export const User = mongoose.model("user", userSchema);
