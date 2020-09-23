const db = require("../../database/connection");

exports.getProfile = async (id) => {
  const getData = await db.query("select * from patients where id=$1", [id]);
  return getData.rows[0];
};

exports.getMedicationsList = async (profileId) => {
  const getMedList = await db.query(
    "select medications.medication_name, medications.medication_usage ,medications.pills_image from medications INNER JOIN patients_medications On medications.id=patients_medications.medication_id where patients_medications.patient_id=$1",
    [profileId]
  );
  return getMedList.rows[0];
};

exports.getMedicationId = async (profileId, medId) => {
  const getMedId = await db.query(
    `SELECT med.medication_name, med.medication_usage,med.pills_image, med.      medication_image, med.medication_name, patients_medications.imprint, patients_medications.end_date 
    FROM medications as med
    INNER JOIN patients_medications On medications.id=$1 
    WHERE patients_medications.patient_id=$2`,
    [profileId, medId]
  );
  return getMedId.rows[0];
};
