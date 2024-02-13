import { JsonMusician, JsonSchedule } from '@shared-utils';
import { BookingDetailsType } from '../const/const';

const apiConfig = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: BodyInit;
}

async function fetchAPI<T>(
  endpoint: string,
  options?: FetchOptions
): Promise<T> {
  const response = await fetch(`${apiConfig.baseURL}${endpoint}`, {
    ...options,
    headers: {
      ...apiConfig.headers,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json();
}

export const fetchSchedules = (): Promise<JsonSchedule[]> => {
  return fetchAPI<JsonSchedule[]>('/schedules/booked');
};

export const fetchMusicianSchedules = (
  musicianId: string
): Promise<JsonSchedule[]> => {
  return fetchAPI<JsonSchedule[]>(`/schedules/musician/${musicianId}`);
};

export const fetchMusicians = (): Promise<JsonMusician[]> => {
  return fetchAPI<JsonMusician[]>('/musicians');
};

export interface BookingDetails {
  [BookingDetailsType.SCHEDULE_ID]: string;
  [BookingDetailsType.NAME]: string;
  [BookingDetailsType.SERVICE_ID]: string;
}
export const createBooking = ({
  scheduleId,
  name,
  serviceId,
}: BookingDetails): Promise<JsonSchedule[]> => {
  return fetchAPI<JsonSchedule[]>(`/schedules/${scheduleId}`, {
    method: 'PUT',
    body: JSON.stringify({ name, serviceId }),
  });
};
