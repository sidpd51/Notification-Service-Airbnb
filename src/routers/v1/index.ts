import express from 'express';
import { sendEmailHandler } from '../../controllers/sendEmail.controller';

const router = express.Router();


router.post('/email', sendEmailHandler);

export default router;