import axios from 'axios';
import { JsonBooking, JsonMusician, JsonSchedule } from '@shared-utils';
import { BookingDetailsType } from '../components/form/booking-form';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchBookings = async (): Promise<JsonBooking[]> => {
  const response = await api.get<JsonBooking[]>('/bookings');
  return response.data;
};

export const fetchSchedulesByMusician = async (
  musicianId: string
): Promise<JsonSchedule[]> => {
  const response = await api.get<JsonSchedule[]>(
    `/schedules/musician/${musicianId}`
  );
  return response.data;
};

export const fetchMusicians = async (): Promise<JsonMusician[]> => {
  const response = await api.get<JsonMusician[]>('/musicians');
  return response.data;
};

export interface BookingDetails {
  [BookingDetailsType.SCHEDULE_ID]: string;
  [BookingDetailsType.NAME]: string;
  [BookingDetailsType.SERVICE_ID]: string;
}

export const createBooking = async ({
  scheduleId,
  name,
  serviceId,
}: BookingDetails): Promise<JsonBooking[]> => {
  const response = await api.post<JsonBooking[]>(`/bookings/${scheduleId}`, {
    name,
    serviceId,
  });
  return response.data;
};
