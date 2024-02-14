import express from 'express';
import musicianRoutes from './musicianRoutes';
import schedulesRoutes from './scheduleRoutes';
import bookingRoutes from './bookingRoutes';

const router = express.Router();

router.use('/musicians', musicianRoutes);
router.use('/schedules', schedulesRoutes);
router.use('/bookings', bookingRoutes);

export default router;
