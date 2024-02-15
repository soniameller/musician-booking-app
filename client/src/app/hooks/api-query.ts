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
    refetchInterval: 60 * 10 * 1000, // 10 minutes,
  });
  return { ...rest, bookings: data };
};

export const useSchedulesQuery = (musicianId: string) => {
  const { data, ...rest } = useQuery({
    queryKey: [QueryKeys.SCHEDULES, musicianId],
    queryFn: async () => await fetchSchedulesByMusician(musicianId),
    staleTime: 1 * 30 * 1000, // 30 seconds,
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });
  return { ...rest, schedules: data };
};

export const useMusiciansQuery = () => {
  const { data, ...rest } = useQuery({
    queryKey: [QueryKeys.MUSICIANS],
    queryFn: async () => {
      const musicians = await fetchMusicians();
      return musicians.filter((musician) => musician.enabled);
    },
    staleTime: Infinity,
  });
  return { ...rest, musicians: data };
};
