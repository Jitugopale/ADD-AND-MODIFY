import mongoose from 'mongoose';

const userDataSchema = new mongoose.Schema({
    rel_custno: { type: String, required: true },
    rel_Individual: { type: String, required: true },
    rel_NAME: { type: String, required: true },
    rel_DOB: { type: Date, required: true },
    rel_MOBNO: { type: String, required: true },
    rel_UID: { type: String, required: true },
    rel_HOUSE: { type: String, required: true },
    rel_LOC: { type: String, required: true },
    rel_VTC: { type: String, required: true },
    rel_District: { type: String, required: true },
    rel_Pin: { type: String, required: true },
    rel_State: { type: String, required: true },
    rel_Subdistrict: { type: String, required: true }
  });


const relatedData = mongoose.model('RELATED', userDataSchema);
export default relatedData;
