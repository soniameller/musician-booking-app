import { JsonBooking } from '@shared-utils';
import {
  Alert,
  Stack,
  SxProps,
  Typography,
  useTheme,
  Box,
} from '@mui/material';
import { useBookingsQuery } from '../hooks/api-query';
import { formatDateToTimeStr } from '../utils/date-utils';
import { Loading } from '../components/feedback/loading';
import { ErrorAlert } from '../components/feedback/error-alert';

export const Bookings = () => {
  const {
    bookings = [],
    isLoading: bookingIsLoading,
    isError: bookingIsError,
  } = useBookingsQuery();
  const theme = useTheme();

  const getBookingText = (booking: JsonBooking): React.ReactNode => {
    const spanStyle: SxProps = { color: theme.palette.grey[500] };

    return (
      <Typography variant="body2" display="inline">
        {booking.name}{' '}
        <Box sx={spanStyle} component="span">
          booked
        </Box>{' '}
        {booking.musician?.name}{' '}
        <Box sx={spanStyle} component="span">
          {/* Used time different from design to keep consistency with the schedule selection */}
          at {formatDateToTimeStr(booking.dateTime)} for a{' '}
        </Box>
        <Typography variant="subtitle2" component="span">
          {booking.service} session
        </Typography>
      </Typography>
    );
  };

  if (bookingIsLoading) {
    return <Loading text={'Loading sessions booked by people...'} />;
  }

  if (bookingIsError) {
    return <ErrorAlert />;
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h3">Sessions booked by people</Typography>
      {bookings.length === 0 ? (
        <Alert severity="info">Nobody booked a session so far</Alert>
      ) : (
        bookings.map((booking: JsonBooking) => (
          <Alert key={booking.id} severity="success" variant="outlined">
            {getBookingText(booking)}
          </Alert>
        ))
      )}
    </Stack>
  );
};
