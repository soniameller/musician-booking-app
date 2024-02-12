import express from 'express';
import musicianRoutes from './musicianRoutes';
import schedulesRoutes from './scheduleRoutes';

const router = express.Router();

router.use('/musicians', musicianRoutes);
router.use('/schedules', schedulesRoutes);

export default router;
