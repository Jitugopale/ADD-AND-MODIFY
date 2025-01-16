import mongoose from'mongoose';

// Define the schema for UserData
const userDataSchema = new mongoose.Schema({
  custno:{type:String},
  NAME: { type: String, required: true },
  DOB: { type: String, required: true },
  MOBNO: { type: String, required: true },
  UID: { type: String, default: '' },
  HOUSE: { type: String, required: true },
  LOC: { type: String, required: true },
  VTC: { type: String, required: true },
  District: { type: String, required: true },
  City: { type: String, required: true },
  Pin: { type: String, required: true },
  StateCode: { type: String, required: true },
  FatherName: { type: String, required: true },
  GENDER: { type: String, required: true },
  DateOfApplication: { type: String, required: true },
  PAN: { type: String, default: 'NOT REQUIRED' },
  RELADDLINE1: { type: String, required: true },
  RELADDLINE2: { type: String, required: true },
  RELADDLINE3: { type: String, required: true },
  RELDistrict: { type: String, required: true },
  RELCity: { type: String, required: true },
  RELPin: { type: String, required: true },
  RELStateCode: { type: String, required: true },
  Type: { type: String, required: true },
  RegiCerti: { type: String, default: '' },
  Certi_Inco: { type: String, default: '' },

   // Fields from second API response
   Photo: { type: String, default: '' },
   Pan: { type: String, default: '' },
   Adhar: { type: String, default: '' },
   Inco_Certi: { type: String, default: '' },
   RegiCertiFromAPI2: { type: String, default: '' }  // Renamed to avoid conflict
});

// Create the model
const UserData = mongoose.model('DATA', userDataSchema);

export default UserData;
