import mongoose from 'mongoose';

const kycSchema = new mongoose.Schema({
    Agent_No: {
        type: String,
        required: true,
    },
    Agent_Name: {
        type: String,
        required: true,
    },
    BankCode: {
        type: String,
        required: true,
    },
    BankName: {
        type: String,
        required: true,
    },
    Branch: {
        type: String,
        required: true,
    },
    BranchName: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const KYC = mongoose.model('KYC', kycSchema);
export default KYC;
