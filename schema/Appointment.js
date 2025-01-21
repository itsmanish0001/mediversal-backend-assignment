import mongoose, {Schema} from "mongoose";

const appointmentSchema = new Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient", // References the Patient model
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // References the Doctor model
      required: true,
    },
    startTime: {
      type: Date, // Stores both date and time
      required: true,
    },
    endTime: {
        type: Date, // Stores both date and time
        required: true,
      },
    reasonForVisit: {
      type: String, // Short description of why the patient is visiting
      trim: true,
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled", "No Show"], // Appointment status
      default: "Scheduled",
    },
    notes: {
      type: String, // Additional notes by the doctor or patient
      trim: true,
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

export {Appointment};
