import express from 'express';
import { sendEmailHandler } from '../../controllers/sendEmail.controller';
import { sendSmsHandler } from '../../controllers/sendSms.controller';

const router = express.Router();


router.post('/email', sendEmailHandler);
router.post('/sms', sendSmsHandler);

export default router;