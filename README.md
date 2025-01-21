# Appointment Scheduler API

## Demo
For a live demo explanation of the project, visit the [Google Drive folder](https://drive.google.com/drive/folders/1iXP-b_2SjWX1XztDF_QmgvOpHu6suEW1?usp=drive_link).

---

## Overview
This API allows you to manage appointments between patients and doctors. It provides functionalities such as creating appointments, checking for time slot overlaps, and retrieving appointment details. 
---
Before scheduling an appointment, you must first register both the doctor and the patient. This is because each appointment is always associated with a specific doctorId and patientId. To make this process easier, routes for managing doctors and patients have been created. Use these routes to register doctors and patients before creating appointments. that's why I also created routes for patient's and doctor's registration. 
---

## Features
- **Patient Management**: Store and reference patient information.
- **Doctor Management**: Store and reference doctor information.
- **Appointment Scheduling**: Create appointments with date and time validation.
- **Overlap Detection**: Automatically checks for overlapping appointments to prevent conflicts.

---



## API Endpoints

### **Appointments**

#### 1. **Create an Appointment**
**POST** `/appointments/new`

**Request Body**:
```json
{
  "patientId": "<patient-id>",
  "doctorId": "<doctor-id>",
  "startTime": "2025-01-22T07:30:00Z",
  "endTime": "2025-01-22T08:30:00Z",
  "reasonForVisit": "General Checkup"
}
```

**Response**:
- **201 Created**:
```json
{
  "message": "Appointment created successfully",
  "appointment": { <appointment-details> }
}
```
- **409 Conflict**:
```json
{
  "error": "Time slot overlaps with an existing appointment"
}
```

#### 2. **Get All Appointments**
**GET** `/appointments/all`

**Response**:
```json
[
  {
    "_id": "<appointment-id>",
    "patientId": "<patient-id>",
    "doctorId": "<doctor-id>",
    "startTime": "2025-01-22T07:30:00Z",
    "endTime": "2025-01-22T08:30:00Z",
    "reasonForVisit": "General Checkup",
    "status": "Scheduled",
    "notes": "",
    "createdAt": "2025-01-20T08:00:00Z",
    "updatedAt": "2025-01-20T08:00:00Z"
  }
]
```

### **Patients**

#### 1. **Create a Patient**
**POST** `/patients/new`

**Request Body**:
```json
{
  "name": "John Doe",
  "age": 30,
  "gender": "Male",
  "email": "john.doe@example.com",
  "phone": "1234567890"
}
```

**Response**:
- **201 Created**:
```json
{
  "message": "Patient created successfully",
  "patient": { <patient-details> }
}
```

#### 2. **Get All Patients**
**GET** `/patients/all`

**Response**:
```json
[
  {
    "_id": "<patient-id>",
    "name": "John Doe",
    "age": 30,
    "gender": "Male",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "createdAt": "2025-01-20T08:00:00Z",
    "updatedAt": "2025-01-20T08:00:00Z"
  }
]
```

### **Doctors**

#### 1. **Create a Doctor**
**POST** `/doctors/new`

**Request Body**:
```json
{
  "name": "Dr. Jane Smith",
  "specialization": "Cardiology",
  "email": "jane.smith@example.com",
  "phone": "9876543210"
}
```

**Response**:
- **201 Created**:
```json
{
  "message": "Doctor created successfully",
  "doctor": { <doctor-details> }
}
```

#### 2. **Get All Doctors**
**GET** `/doctors/all`

**Response**:
```json
[
  {
    "_id": "<doctor-id>",
    "name": "Dr. Jane Smith",
    "specialization": "Cardiology",
    "email": "jane.smith@example.com",
    "phone": "9876543210",
    "createdAt": "2025-01-20T08:00:00Z",
    "updatedAt": "2025-01-20T08:00:00Z"
  }
]
```

---

## Appointment Overlap Detection

The API ensures no two appointments for the same doctor overlap. It uses the following logic:
```javascript
const overlappingAppointment = await Appointment.findOne({
  doctorId: doctorId,
  $or: [
    { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
  ],
});
```
This query checks if any existing appointment's start or end time conflicts with the new appointment's time range.

---

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Environment Variables**: dotenv

---



---

## Future Enhancements
- Add authentication for doctors and patients.
- Include email and SMS notifications for appointment reminders.
- Implement pagination for retrieving large datasets.
