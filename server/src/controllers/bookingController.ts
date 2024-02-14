import { Request, Response } from 'express';
import * as BookingService from '../services/bookingService';

export const getBookedSchedules = async (req: Request, res: Response) => {
  try {
    const bookings = await BookingService.fetchTodaysBookings();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { scheduleId } = req.params;
    const { name, serviceId } = req.body;
    const booking = await BookingService.createBooking(scheduleId, {
      name,
      serviceId,
    });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
