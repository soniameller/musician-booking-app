import { Stack, Skeleton } from '@mui/material';
import { Loading } from '../loading';

export const ScheduleSkeleton = () => {
  return (
    <Stack
      spacing={2}
      sx={{
        height: '100%',
        backgroundColor: 'white',
        borderRadius: '8px',
        p: 3,
      }}
    >
      <Skeleton variant="rectangular" height={20} width={130} />
      <Skeleton variant="rectangular" height={56} />
      <Loading text={'Loading available times...'} />
    </Stack>
  );
};
