import { useSchedulesQuery } from '../hooks/api-query';
import { Box, Button, Grid, Typography, Stack } from '@mui/material';
import { BookingDetails, createBooking } from '../services/api-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '../const/query-keys';
import BookingForm from '../components/form/booking-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../const/app-routes';
import { ScheduleSkeleton } from '../components/feedback/skeleton/schedules-skeleton';
import { ErrorAlert } from '../components/feedback/error-alert';

interface SchedulesParams {
  musicianId: string;
}

export const Schedules = ({ musicianId }: SchedulesParams) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const scheduleMutation = useMutation({
    mutationFn: async (values: BookingDetails) => createBooking(values),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SCHEDULES],
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.BOOKINGS],
      });
      setSuccess(true);
    },
    onError: () => setBookingError(true),
  });

  const handleSubmit = async (values: BookingDetails) => {
    scheduleMutation.mutate(values);
  };

  const {
    schedules = [],
    isLoading: schedulesIsLoading,
    isError: scheduleIsError,
  } = useSchedulesQuery(musicianId);

  if (schedulesIsLoading) {
    return <ScheduleSkeleton />;
  }

  if (scheduleIsError || bookingError) {
    return <ErrorAlert />;
  }

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        borderRadius: '8px',
      }}
    >
      {success ? (
        <Grid container p={3} alignContent={'space-between'} height={'100%'}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant="h5">All good!</Typography>
              <Typography variant="body2">
                Your session was added to the list
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={Link}
              to={APP_ROUTES.LANDING_PAGE.path}
              fullWidth
              variant="outlined"
            >
              Close
            </Button>
          </Grid>
        </Grid>
      ) : (
        <BookingForm schedules={schedules} onSubmit={handleSubmit} />
      )}
    </Box>
  );
};
