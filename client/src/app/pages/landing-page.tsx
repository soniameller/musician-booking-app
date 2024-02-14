import { Grid, Stack, Typography } from '@mui/material';
import { Musicians } from '../containers/musicians';
import { Bookings } from '../containers/bookings';
import { Schedules } from '../containers/schedules';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../components/layout/layout';
import { APP_ROUTES } from '../const/app-routes';

export const LandingPage = () => {
  const params = useParams();
  const { musicianId } = params;

  return (
    <Layout>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Link to={APP_ROUTES.LANDING_PAGE.path}>
              <Typography variant="h5" component="h1">
                Musician Booking platform
              </Typography>
            </Link>
            <Typography
              variant="h3"
              component="h2"
              fontWeight={'fontWeightMedium'}
              color="textSecondary"
            >
              Select a musician
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={musicianId ? 8 : 12}>
          <Musicians selectedId={musicianId} />
        </Grid>
        {musicianId && (
          <Grid item xs={12} lg={4}>
            <Schedules musicianId={musicianId} />
          </Grid>
        )}
        <Grid item xs={12}>
          <Bookings />
        </Grid>
      </Grid>
    </Layout>
  );
};
