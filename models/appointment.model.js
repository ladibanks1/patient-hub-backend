import { Schema, SchemaTypes, model } from "mongoose";

// Appointment Schema 
const appointmentSchema = new Schema({
  patient: {
    type: SchemaTypes.ObjectId,
    ref: "Patient",
    required: [true , "Please specify the patient"],
  },
  doctor: {
    type: SchemaTypes.ObjectId,
    ref: "Staff",
    required: [true , "Please Choose a Doctor"],
  },
  hospital: {
    type: SchemaTypes.ObjectId,
    ref: "Hospital",
    required: [true , "Please specify the hospital"],
  },
  appointment_date: {
    type: Date,
    validate: {
      validator: function (value) {
        return value > Date.now();
      },
      message: "Appointment date must be in the future",
    },
    required: [true , "Please choose an appointment date"],
  },
  symptoms: {
    type: String,
    required: [true , "Please outline the symptoms"],
  },
  notes: {
    type: String,
    required: [true , "Please explain more about the symptoms"],
  },
  status: {
    type : String,
    enum: ['Pending' , 'Confirmed' , 'Cancelled' , 'Completed' ],
    default : "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
  }
});

// Updated At MiddleWare
appointmentSchema.pre("save" , function(next){
    this.updatedAt = Date.now()
    next()
})

const appointmentModel = model("Appointment" , appointmentSchema)
export default appointmentModel;
