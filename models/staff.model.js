// Modules
import { Schema, SchemaTypes, model } from "mongoose";
import staffRegistrationMail from "../utils/staffRegistrationMail.js";
import { hashPassword } from "../utils/passwords.js";
import emailValidator from "../utils/emailValidator.js";

// Referenced Models
import "./appointment.model.js";
import "./hospital.model.js";

const docRegex = /doctor/i;

// Generate random password
const password = Math.random().toString(36).slice(-8);

// Staff Schema
const staffSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "Please enter your first name"],
    trim: true,
  },
  last_name: {
    type: String,
    required: [true, "Please enter your last name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: [
      emailValidator,
      "Email is not a valid  gmail account, Gmail is required",
    ],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    trim: true,
    minLength: [6, "Password must be at least 6 characters"],
    default: password,
  },
  position: {
    type: String,
    required: [true, "Please specify a Position"],
  },
  specialism: {
    type: String,
  },
  hospital_id: {
    type: SchemaTypes.ObjectId,
    ref: "Hospital",
    required: true,
  },
  patients: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Patient",
    },
  ],
  appointments: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Appointment",
    },
  ],
  picture: {
    type: String,
    default:
      "https://res.cloudinary.com/ladibanks1/image/upload/v1730287488/Patient_Hub/jhjonrorgr9auwi9fvf0.png",
  },
  ratings: [
    {
      type: Number,
      validate: {
        validator: function (value) {
          if (value <= 5) return true;
          return false;
        },
        message: () => `Rating must not be greater than five(5)`,
      },
    },
  ],
});

// Get Full Name
staffSchema.virtual("full_name").get(function () {
  return this.first_name + " " + this.last_name;
});

// Add appointment for Doctors Alone
staffSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await hashPassword(this.password);
    this.password = hashedPassword;
  } catch (error) {
    next(error);
  }

  // Initializing appointment for doctors only
  if (docRegex.test(this.position)) {
    // Making sure the appointment is an array
    if (!this.appointment || !Array.isArray(this.appointment)) {
      this.appointment = [];
    }
  }

  next();
});

staffSchema.pre("findOneAndUpdate", async function (next) {
  // Hashing Updated Password
  const update = this.getUpdate().$set;
  if (update) {
    try {
      const hashedPassword = await hashPassword(update.password);
      update.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  }
});

staffSchema.post("save", async function (doc, next) {
  //Send Mail To staff After signing Up
  try {
    const details = await staffModel
      .findById(doc._id)
      .populate("hospital_id", "name")
      .exec();
    const { response } = await staffRegistrationMail(details, password);
    //  Check if Mail was sent Successfully
    if (response.includes("OK")) {
      return next();
    }
    // Throw error if not
    throw { message: "Unable to Send Mail" };
  } catch (err) {
    // Error Handling
    const error = { message: err?.message || "Unable to Send Mail", path: "Email" };

    // Delete Document if Error Occurs
    await doc.deleteOne({ _id: doc._id });

    next(error);
  }
});
const staffModel = model("Staff", staffSchema);
export default staffModel;
