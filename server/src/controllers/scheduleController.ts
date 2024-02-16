import { Request, Response } from 'express';
import * as ScheduleService from '../services/scheduleService';

export const getMusicianSchedules = async (req: Request, res: Response) => {
  try {
    const schedules = await ScheduleService.fetchMusicianSchedules(
      req.params.musicianId
    );
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
