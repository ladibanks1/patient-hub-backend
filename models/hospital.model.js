import { Schema, SchemaTypes, model } from "mongoose";
import emailValidator from "../utils/emailValidator.js";
import { hashPassword } from "../utils/passwords.js";

// Referenced Models
import "./appointment.model.js";
import "./staff.model.js";
import "./patient.model.js";

// Hospital Schema
const hospitalSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter the hospital name"],
    trim: true,
    unique: true,
  },
  state: {
    type: String,
    required: [true, "Please enter the hospital state"],
    trim: true,
  },
  LGA: {
    type: String,
    required: [true, "Please enter the hospital L.G.A"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Please enter the hospital address"],
    trim: true,
  },
  tel: {
    type: String,
    required: [true, "Please enter the hospital phone number"],
    trim: true,
    validate: {
      validator: function (value) {
        return /^(\+234|0)\d{10}$/i.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid Nigerian phone number!`,
    },
    unique: true,
  },
  email: {
    type: String,
    validate: [emailValidator, "Email is not a valid  gmail account, Gmail is required"],
    required: [true, "Please enter the hospital email"],
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter the hospital password"],
    minLength: [6, "Password must be at least 6 characters"],
    trim: true,
  },
  appointments: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Appointment",
    },
  ],
  patients: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Patient",
    },
  ],
  staffs: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Staff",
    },
  ],
  ratings: [
    {
      type: Number,
      validate : {
        validator: function(value){
            if(value <= 5) return true
            return false
        },
        message: () => `Rating must not be greater than five(5)`
      }
    },
  ],
});

hospitalSchema.pre("save", async function (next) {
  // Hashing of Password
  const hashedPassword = await hashPassword(this.password);
  this.password = hashedPassword;
  next();
});


hospitalSchema.pre("findOneAndUpdate", async function (next) {
  // Hashing updated Password
  const update = this.getUpdate();
  if (update) {
    const hashedPassword = await hashPassword(update.password);
    update.password = hashedPassword;
    next();
  }
});


const hospitalModel = model("Hospital", hospitalSchema);
export default hospitalModel;
