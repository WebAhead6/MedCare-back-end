const express = require("express");
const app = require("../app");
const router = express.Router();
// const middlewares = require("../middlewares");
const patients = require("./patient");

// router.use(middlewares.autoCheck);
router.post("/patient/login", patients.login);
router.get("/profile/:id", patients.profile);
router.get("/medicationsList/:profileId", patients.medicationsList);
router.get("/medicationsList/:profileId/:medId", patients.medicationId);
router.post("/pills/remove/:profileId/:medId", patients.removePill);
router.post("/doctor/register", patients.register);
router.get("/doctor/PatientList", patients.patientList);
router.post("/patient/ques", patients.addQues);
router.get("/doctor/profile", patients.doctorProfile);
router.get("/mediRemove/:profileId/:medId", patients.mediRemove);
module.exports = router;
