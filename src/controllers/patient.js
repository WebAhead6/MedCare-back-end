const model = require("../models/patients");
const bcrypt = require("bcrypt");

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
      message: "user added successfully",
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
