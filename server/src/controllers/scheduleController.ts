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

export const getBookedSchedules = async (req: Request, res: Response) => {
  try {
    const schedules = await ScheduleService.fetchBookedSchedules();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSchedule = async (req: Request, res: Response) => {
  try {
    const { scheduleId } = req.params;
    const { name, serviceId } = req.body;
    const updatedSchedule = await ScheduleService.bookSchedule(scheduleId, {
      name,
      serviceId,
    });
    res.json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
