import mongoose, {Schema, model} from "mongoose";

const patientSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"], // Ensures only valid options are entered
    },
    contactNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v); // Validates a 10-digit number
        },
        message: "Contact number must be a valid 10-digit number",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    medicalHistory: {
      type: [String], // Array of strings for previous medical conditions
      default: [],
    },
  }, { timestamps: true }); // Automatically adds createdAt and updatedAt fields
  


const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema);

export {Patient};

  
  