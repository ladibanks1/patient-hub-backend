import { Schema, SchemaTypes, model } from "mongoose";
import emailValidator from "../utils/emailValidator.js";
import { hashPassword } from "../utils/passwords.js";

// Referenced Models
import "./appointment.model.js";
import "./staff.model.js";
import "./hospital.model.js";

// Patient Schema
const patientSchema = new Schema({
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
    validate: [emailValidator, "Email is not a valid  gmail account, Gmail is required"],
    required: [true, "Please enter your email"],
    trim: true,
    lowercase: true,
    unique: [true, "Email already exists"],
  },
  state: {
    type: String,
    required: [true, "Please enter your State"],
    trim: true,
  },
  LGA: {
    type: String,
    required: [true, "Please enter your L.G.A"],
    trim: true,
  },
  tel: {
    type: String,
    required: [true, "Please enter your phone number"],
    trim: true,
    validate: {
      validator: function(value) {
        return /^(\+234|0)\d{10}$/i.test(value);
      },
      message: props => `${props.value} is not a valid Nigerian phone number!`
    },
    unique : true
  },
  DOB: {
    type: Date,
    required: [true, "Please specify your date of birth"],
  },
  picture: {
    type: String,
    required: [true, "Please upload your picture"],
    default: "https://res.cloudinary.com/ladibanks1/image/upload/v1730287488/Patient_Hub/jhjonrorgr9auwi9fvf0.png",
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
    required: [true, "Please specify your gender"],
    default: "Others",
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be at least 6 characters"],
    trim: true,
  },
  appointments: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Appointment",
    },
  ],
  doctors: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Staff",
    },
  ],
  hospitals: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Hospital",
    }
  ]
});

patientSchema.virtual("full_name").get(function(){
    return this.first_name + " " + this.last_name
})


patientSchema.pre("save" , async function(next){
  // Hashing password
  const hashedPassword = await hashPassword(this.password)
  this.password = hashedPassword
  next()
})
const patientModel = model("Patient" , patientSchema)
export default patientModel;
