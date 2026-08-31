import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const UserSchema = new Schema(
  {
    name: {
    type: String,
    required: true,
    trim: true,
    minLength:1,
    maxLength:30
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
},
  { 
    timestamps: true 
  },
  
);

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, name: this.name, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );
  return token;
};

export const User = mongoose.model("User", UserSchema);
