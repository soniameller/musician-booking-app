import {
  fetchMusicianSchedules,
  fetchMusicians,
  fetchSchedules,
} from '../services/api-service';
import { QueryKeys } from '../const/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useSchedulesQuery = () => {
  const { data, ...rest } = useQuery({
    queryKey: [QueryKeys.SCHEDULES],
    queryFn: async () => await fetchSchedules(),
    staleTime: Infinity,
  });
  return { ...rest, schedules: data };
};

export const useMusicianSchedulesQuery = (musicianId: string) => {
  const { data, ...rest } = useQuery({
    queryKey: [QueryKeys.MUSICIAN_SCHEDULES, musicianId],
    queryFn: async () => await fetchMusicianSchedules(musicianId),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
  return { ...rest, musicianSchedules: data };
};

export const useMusiciansQuery = () => {
  const { data, ...rest } = useQuery({
    queryKey: [QueryKeys.MUSICIANS],
    queryFn: async () => await fetchMusicians(),
    staleTime: Infinity,
  });
  return { ...rest, musicians: data };
};
