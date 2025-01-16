import express from 'express';
import { kycUserdata } from '../controllers/authcontrollers.js';
import { kycUpdatedata } from '../controllers/authcontrollers.js';
import { updateVerificationCount } from '../controllers/authcontrollers.js';

const router = express.Router();

// Login route
router.post('/getdata', kycUserdata);
router.post('/updatedata', kycUpdatedata);
router.get('/getcount', updateVerificationCount);


export default router;
