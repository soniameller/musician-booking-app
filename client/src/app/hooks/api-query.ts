import {
  fetchSchedulesByMusician,
  fetchMusicians,
  fetchBookings,
} from '../services/api-service';
import { QueryKeys } from '../const/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useBookingsQuery = () => {
  const { data, ...rest } = useQuery({
    queryKey: [QueryKeys.BOOKINGS],
    queryFn: async () => await fetchBookings(),
    staleTime: Infinity,
  });
  return { ...rest, bookings: data };
};

export const useSchedulesQuery = (musicianId: string) => {
  const { data, ...rest } = useQuery({
    queryKey: [QueryKeys.SCHEDULES, musicianId],
    queryFn: async () => await fetchSchedulesByMusician(musicianId),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
  return { ...rest, schedules: data };
};

export const useMusiciansQuery = () => {
  const { data, ...rest } = useQuery({
    queryKey: [QueryKeys.MUSICIANS],
    queryFn: async () => await fetchMusicians(),
    staleTime: Infinity,
  });
  return { ...rest, musicians: data };
};
