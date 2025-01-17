import express from 'express';
import { kycUserdata } from '../controllers/authcontrollers.js';
import { kycUpdatedata } from '../controllers/authcontrollers.js';
import { updateVerificationCount } from '../controllers/authcontrollers.js';
import { submitRelatedData } from '../controllers/authcontrollers.js';
import { relatedUpdatedata } from '../controllers/authcontrollers.js';

const router = express.Router();

// Login route
router.post('/getdata', kycUserdata);
router.post('/updatedata', kycUpdatedata);
router.get('/getcount', updateVerificationCount);
router.post('/related', submitRelatedData);
router.post('/updaterelated', relatedUpdatedata);


export default router;
