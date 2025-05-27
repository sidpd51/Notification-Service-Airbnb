import express from "express";
import { sendEmailHandler } from "../../controllers/sendEmail.controller";

const emailRouter = express.Router();

emailRouter.post('/', sendEmailHandler);

export default emailRouter;
