const model = require("../models/patients");

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
