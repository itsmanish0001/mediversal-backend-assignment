import express from "express";
import dotenv from "dotenv";
import {dbConnect} from "./utils.js"
import { errorMiddleware } from "./error.js";
import {fetch_all_patients, new_patient, fetch_all_appointments, fetch_all_doctors, new_doctor, new_appointment} from "./controllers.js"



// Load environment variables
dotenv.config({
    path: "./.env",
});

// Connect to the database
dbConnect();

const port =  process.env.PORT;
const app = express();

app.use(express.json()); // Middleware to parse JSON requests



app.get('/', (req, resp)=>{
    resp.send("hlo world");
})


app.post('/patients/new', new_patient);
app.get('/patients/all', fetch_all_patients); 


app.post('/doctors/new', new_doctor);
app.get('/doctors/all', fetch_all_doctors);


app.post('/appointments/new', new_appointment);
app.get('/appointments/all', fetch_all_appointments);



// Error handling middleware
app.use(errorMiddleware);




app.listen(4000, (error) => {
    console.log(`app is listening on ${port}`);
});