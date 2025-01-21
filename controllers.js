import { TryCatch } from "./error.js";
import { Patient } from "./schema/Patient.js";
import { Doctor } from "./schema/Doctor.js";
import { ErrorHandler } from "./error.js";
import { Appointment } from "./schema/Appointment.js";



const fetch_all_patients = TryCatch(async(req, resp)=>{

    const all = await Patient.find({});
    resp.json({
        success:true,
        response: all
    })


})


const new_patient = TryCatch(async(req, resp)=>{
    
    const {name, age, address, contactNumber, email, gender} = req.body;

    const response = await Patient.create({name, age, address, contactNumber, email, gender});

    resp.json({
        "message": "Patient created successfully",
        "patient": response
    });



})


const new_doctor = TryCatch(async(req,resp)=>{

    const {name, email, contactNumber, specialization} = req.body;

    const response = await Doctor.create({name, email, contactNumber, specialization});

    resp.json({
        "message": "Doctor Registered successfully",
        "doctor": { response }
    });


})



const fetch_all_doctors = TryCatch(async(req,resp)=>{

    const response = await Doctor.find({});
    
    resp.json({
        success:true,
        response: response
    })



})







const fetch_all_appointments = TryCatch(async(req,resp)=>{

    const response = await Appointment.find({});

    resp.send(response);


})



const new_appointment = TryCatch(async(req,resp, next)=>{

    const {doctorId, patientId, startTime, endTime} = req.body;

    const overlappingAppointment = await Appointment.findOne({
        doctorId: doctorId,
        $or: [
          { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
        ],
      });

      

    if(overlappingAppointment !== null){
       return next(new ErrorHandler("Time slot overlaps with an existing appointment"));
    }

    const response = await Appointment.create({doctorId, patientId, startTime, endTime});

    return resp.json({
        "message": "Appointment created successfully",
        "appointment":response
    })


})







export {fetch_all_patients, new_patient, fetch_all_appointments, new_appointment, fetch_all_doctors, new_doctor};