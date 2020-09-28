BEGIN;

DROP TABLE IF EXISTS patients, medications, patients_medications, patients_questions CASCADE;

CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  id_num SERIAL NOT NULL UNIQUE,
  password VARCHAR(250),
  birthdate VARCHAR(250) NOT NULL,
  phone_number VARCHAR(250),
  medical_report TEXT
  );

CREATE TABLE medications (
  id SERIAL PRIMARY KEY,
  medication_name TEXT,
  medication_usage TEXT,
  description TEXT,
medication_image TEXT,
pills_image TEXT,
pills_num INTEGER,
treatment TEXT
);

CREATE TABLE patients_medications (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id),
  medication_id INTEGER REFERENCES medications(id),
  imprint TEXT, 
  end_date TEXT,
  pills_num INTEGER
);


CREATE TABLE patients_questions (
      id SERIAL PRIMARY KEY,
patient_id INTEGER REFERENCES patients(id),
patient_q TEXT,
doc_response TEXT,
refill TEXT
);

INSERT INTO patients (first_name, last_name, id_num, password, birthdate, phone_number, medical_report) VALUES
('abeer', 'riziq','123456789','lala','01/08/1993','0524786547','the patient has a severe allergy to dumbness'),
('mervat','yossef','234567890','1234','15/01/1993','052345677','...');

INSERT INTO medications(medication_name,medication_usage,description,medication_image, pills_image, pills_num,treatment) VALUES
('Amlodipine','Take this medication by mouth with or without food as directed by your doctor, usually once daily.','Amlodipine is used with or without other medications to treat high blood pressure.','https://www.prescriptiondoctor.com/storage/product_images_th/amlodipine-tablet-500x500.png', 'https://img.medscapestatic.com/pi/features/drugdirectory/octupdate/ROX01020.jpg', '30','high blood pressure'),
('Metformin','Take this medication by mouth as directed by your doctor, usually 1-3 times a day with meals. Drink plenty of fluids while taking this medication unless otherwise directed by your doctor.','Metformin is used with a proper diet and exercise program and possibly with other medications to control high blood sugar. It is used in patients with type 2 diabetes.','https://res.cloudinary.com/grohealth/image/upload/$wpsize_!_cld_full!,w_1200,h_630,c_scale/v1588088500/Metformin-1200x630-1.jpg','https://img.medscapestatic.com/pi/features/drugdirectory/octupdate/TEV10480.jpg','30','diabetes'),
('Eplerenone','Take this medication by mouth, usually once or twice daily, with or without food, or as directed by your doctor','This medication is used alone or in combination with other medicines to treat high blood pressure.','https://www.crescentpharma.com/wp-content/uploads/2018/09/Eplerenone-25mg.png','https://img.medscapestatic.com/pi/features/drugdirectory/octupdate/SDZ53690.jpg','30','high blood pressure');

INSERT INTO patients_medications (patient_id, medication_id, imprint, end_date,pills_num) VALUES 
(1,1, '30mg', '23/10/2020','15'),
(1,2, '10mg', '20/10/2020','20'),
(1,3, '30mg', '23/10/2020','15');



INSERT INTO patients_questions (patient_id, patient_q, doc_response) VALUES
(1, 'Where can I have a blood test besides the clinic?', 'At the closest medical center');

COMMIT;
