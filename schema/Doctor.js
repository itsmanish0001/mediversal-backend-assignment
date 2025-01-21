import mongoose, {Schema} from "mongoose";

const doctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specialization: {
      type: String, // e.g., "Cardiologist", "Pediatrician"
      required: true,
      trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please fill a valid 10-digit phone number"], // Regex for 10-digit numbers
    },
    
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

const Doctor = mongoose.models.Doctor ||  mongoose.model("Doctor", doctorSchema);

export {Doctor};
