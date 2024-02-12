import express from 'express';
import { getMusicians } from '../controllers/musicianController';

const router = express.Router();

router.get('/', getMusicians);

export default router;
