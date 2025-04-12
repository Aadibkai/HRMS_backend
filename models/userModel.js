import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    hashPassword: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    mobileNo: { type: Number },
    email: { type: String, unique: true },
    role: {
      type: String,
      default: "user",
      enum: ["user", "recruiter", "admin", "tempUser", "tempRecruiter", "tempEmployer", "employer"],
    },
    id: { type: String },
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  this.hashPassword = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
  matchPassword: async function (password) {
    return await bcrypt.compare(password, this.hashPassword);
  },
  generateToken: async function () {
    return jwt.sign(
      { _id: this._id, email: this.email, role: this.role },
      "SUPERSECRETSTRING",
      { expiresIn: "1d" }
    );
  },
};

export default model("User", userSchema);
