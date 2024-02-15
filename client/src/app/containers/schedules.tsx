import { useSchedulesQuery } from '../hooks/api-query';
import { Box, Button, Grid, Typography, Stack, BoxProps } from '@mui/material';
import { BookingDetails, createBooking } from '../services/api-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '../const/query-keys';
import BookingForm from '../components/form/booking-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../const/app-routes';
import { ScheduleSkeleton } from '../components/feedback/skeleton/schedules-skeleton';
import { ErrorAlert } from '../components/feedback/error-alert';

interface ContentBoxProps extends BoxProps {
  children: React.ReactNode;
}

const ContentBox = ({ children, ...rest }: ContentBoxProps) => {
  return (
    <Box
      {...rest}
      sx={{
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        ...rest.sx,
      }}
    >
      {children}
    </Box>
  );
};

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
    return (
      <ContentBox>
        <ScheduleSkeleton />
      </ContentBox>
    );
  }

  if (scheduleIsError || bookingError || !schedules.length) {
    return (
      <ContentBox sx={{ p: 3 }}>
        <Stack justifyContent={'space-between'} height={'100%'}>
          <ErrorAlert />
          <Button
            component={Link}
            to={APP_ROUTES.LANDING_PAGE.path}
            fullWidth
            variant="outlined"
          >
            Take me back home {':('}
          </Button>
        </Stack>
      </ContentBox>
    );
  }

  if (success) {
    return (
      <ContentBox>
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
      </ContentBox>
    );
  }

  return (
    <ContentBox>
      <BookingForm schedules={schedules} onSubmit={handleSubmit} />
    </ContentBox>
  );
};
