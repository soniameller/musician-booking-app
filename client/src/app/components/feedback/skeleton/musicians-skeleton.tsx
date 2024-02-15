import { Grid, Skeleton } from '@mui/material';

export const MusiciansSkeleton = () => {
  return (
    <Grid container spacing={3}>
      {Array.from(new Array(4)).map((_, index) => (
        <Grid item key={index}>
          <Skeleton variant="rectangular" width={320} height={300} />
        </Grid>
      ))}
    </Grid>
  );
};
