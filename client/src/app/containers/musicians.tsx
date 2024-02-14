import { JsonMusician } from '@shared-utils';
import { MusicianCard } from '../components/musician-card';
import { useMusiciansQuery } from '../hooks/api-query';
import { Grid } from '@mui/material';
import { MusiciansSkeleton } from '../components/feedback/skeleton/musicians-skeleton';
import { ErrorAlert } from '../components/feedback/error-alert';

interface MusiciansProps {
  selectedId?: string;
}

export const Musicians = ({ selectedId }: MusiciansProps) => {
  const {
    musicians = [],
    isLoading: musicianIsLoading,
    isError: musicianIsError,
  } = useMusiciansQuery();

  if (musicianIsLoading) {
    return <MusiciansSkeleton />;
  }

  if (musicianIsError) {
    return <ErrorAlert />;
  }

  return (
    <Grid container spacing={3}>
      {musicians.map((musician: JsonMusician) => (
        <Grid item key={musician.id}>
          <MusicianCard
            musician={musician}
            selected={String(musician.id) === selectedId}
          />
        </Grid>
      ))}
    </Grid>
  );
};
