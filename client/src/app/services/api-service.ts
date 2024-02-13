import axios from 'axios';
import { JsonMusician, JsonSchedule } from '@shared-utils';
import { BookingDetailsType } from '../components/form/booking-form';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchSchedules = async (): Promise<JsonSchedule[]> => {
  const response = await api.get<JsonSchedule[]>('/schedules/booked');
  return response.data;
};

export const fetchMusicianSchedules = async (
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
}: BookingDetails): Promise<JsonSchedule[]> => {
  const response = await api.put<JsonSchedule[]>(`/schedules/${scheduleId}`, {
    name,
    serviceId,
  });
  return response.data;
};
