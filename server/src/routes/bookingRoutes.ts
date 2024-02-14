import express from 'express';
import {
  getBookedSchedules,
  createBooking,
} from '../controllers/bookingController';

const router = express.Router();

router.get('/', getBookedSchedules);

router.post('/:scheduleId', createBooking);

export default router;
