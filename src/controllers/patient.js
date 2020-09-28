const model = require("../models/patients");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { password, identityNumber } = req.body;

    const patient = await model.getDataById(identityNumber);

    if (!patient)
      throw new Error(
        "The id is incorrect ,or maybe you don't have an account please contect your doctor"
      );

    const passwordsEqual = await bcrypt.compare(password, patient.password);

    if (!passwordsEqual) throw new Error("Password is incorrect");

    const token = await jwt.sign(
      { patient: patient.id_num, id: patient.id },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token);
    res.json({
      message: "Logged successfully",
      data_id: patient.id,
      code: 200,
    });
  } catch ({ message }) {
    return res.status(200).json({ message });
  }
};

exports.profile = async (req, res) => {
  try {
    const profileData = await model.getProfile(req.params.id);
    res.status(200).json({ code: 200, data: profileData });
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
};

exports.medicationsList = async (req, res) => {
  try {
    const medList = await model.getMedicationsList(req.params.profileId);

    res.status(200).json({ code: 200, data: medList });
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
};

exports.medicationId = async (req, res) => {
  try {
    const { profileId, medId } = req.params;
    console.log(req.params);
    const medDetails = await model.getMedicationId(profileId, medId);

    res.status(200).json({ code: 200, data: medDetails });
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
};

exports.removePill = async (req, res) => {
  try {
    const { profileId, medId } = req.params;
    const pillsData = await model.removePill(profileId, medId);
    res.status(200).json({ code: 200, data: pillsData });
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
};

exports.register = async (req, res) => {
  const newPatient = ({
    firstName,
    lastName,
    identityNumber,
    password,
    birthdate,
    gender,
    phoneNumber,
  } = req.body);
  try {
    newPatient.password = await bcrypt.hash(req.body.password, 10);

    const addPatient = await model.createNewPatient(newPatient);

    res.status(200).json({
      message: "patient added successfully",
      code: 200,
      data: addPatient,
    });
  } catch ({ message }) {
    return res.status(200).json({ message });
  }
};

exports.patientList = async (req, res) => {
  try {
    const patientListData = await model.getPatientData();
    res.status(200).json({ code: 200, data: patientListData });
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
};
