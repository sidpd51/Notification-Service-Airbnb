import express from 'express';
import { getBookingsHanlder } from '../../controllers/bookingController';


const bookingRouter = express.Router();


bookingRouter.get('/',getBookingsHanlder);

export default bookingRouter;