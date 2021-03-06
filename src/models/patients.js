const db = require("../../database/connection");

exports.getDataById = async (id) => {
  const data = await db.query("select * from patients where id_num=$1", [id]);

  return data.rows.length ? data.rows[0] : null;
};
exports.getProfile = async (id) => {
  const getData = await db.query("select * from patients where id=$1", [id]);
  return getData.rows[0];
};

exports.getMedicationsList = async (profileId) => {
  const getMedList = await db.query(
    `SELECT medications.medication_name, medications.treatment ,medications.pills_image, medications.id,patients_medications.pills_num
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

exports.createNewPatient = async ({
  firstName,
  lastName,
  identityNumber,
  password,
  birthDate,
  phoneNumber,
}) => {
  const exists = await exports.getDataById(identityNumber);
  if (exists) throw new Error("id already exists in the database");
  const queryRes = await db.query(
    `INSERT INTO patients(first_name,last_name,id_num, password,birthdate,phone_number) VALUES($1,$2,$3,$4,$5,$6)`,
    [firstName, lastName, identityNumber, password, birthDate, phoneNumber]
  );
  return queryRes;
};

exports.getPatientData = async () => {
  const getData = await db.query(
    "select id,first_name,last_name,id_num from patients"
  );
  return getData.rows;
};

exports.enterPatientQue = (patient_id, patient_q) => {
  return db.query(
    `INSERT INTO patients_questions(patient_id,patient_q)
  VALUES($1,$2)`,
    [patient_id, patient_q]
  );
};
exports.deleteMedication = (patientId, medicationId) => {
  return db.query(
    `DELETE FROM patients_medications WHERE patient_id = $1 AND medication_id=$2;`,
    [patientId, medicationId]
  );
};
