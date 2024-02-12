import express from 'express';
import {
  updateSchedule,
  getMusicianSchedules,
  getBookedSchedules,
} from '../controllers/scheduleController';

const router = express.Router();

router.get('/booked', getBookedSchedules);

router.get('/musician/:musicianId', getMusicianSchedules);

router.put('/:scheduleId', updateSchedule);

export default router;
