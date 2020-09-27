const db = require("../../database/connection");

exports.getProfile = async (id) => {
  const getData = await db.query("select * from patients where id=$1", [id]);
  return getData.rows[0];
};

exports.getMedicationsList = async (profileId) => {
  const getMedList = await db.query(
    `SELECT medications.medication_name, medications.treatment ,medications.pills_image, medications.id
    FROM medications INNER JOIN patients_medications
     On medications.id=patients_medications.medication_id Where patients_medications.patient_id=$1`,
    [profileId]
  );
  return getMedList.rows;
};

exports.getMedicationId = async (profileId, medId) => {
  console.log(medId);
  const getMedId = await db.query(
    `SELECT med.medication_name, med.medication_usage, 
            med.pills_image, med.medication_image, med.medication_name, 
            PM.imprint, PM.end_date, PM.pills_num
    FROM medications as med
    LEFT JOIN patients_medications as PM On med.id=$1 
    WHERE PM.patient_id=$2 AND PM.medication_id=$1`,
    [medId, profileId]
  );
  return getMedId.rows[0];
};

exports.removePill = async (profileId, medId) => {
  const data = await db.query(
    `SELECT pills_num
   FROM patients_medications WHERE patient_id = $1 and 
   medication_id=$2;`,
    [profileId, medId]
  );
  console.log(data.rows[0].pills_num);

  const updatePillsNum = data.rows[0].pills_num - 1;

  return db.query(
    `UPDATE patients_medications SET 
pills_num = $1 WHERE patient_id = $2 AND medication_id=$3;`,
    [updatePillsNum, profileId, medId]
  );
};
