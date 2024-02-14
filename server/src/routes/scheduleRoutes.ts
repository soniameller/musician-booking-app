import express from 'express';
import {
  getMusicianSchedules
} from '../controllers/scheduleController';

const router = express.Router();

router.get('/musician/:musicianId', getMusicianSchedules);

export default router;
