import express from 'express';
import { sendEmailHandler } from '../../controllers/sendEmail.controller';
import { validateRequetBody } from '../../validators';
import { emailPayloadSchema } from '../../validators/email.validator';


const router = express.Router();


router.post('/email', validateRequetBody(emailPayloadSchema), sendEmailHandler);

export default router;