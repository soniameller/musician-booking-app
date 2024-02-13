import { JsonMusician } from '@shared-utils';
import { Link } from 'react-router-dom';
import { buildRouteUrl } from '../utils/routing';
import { APP_ROUTES } from '../const/app-routes';
import {
  Typography,
  CardActionArea,
  CardMedia,
  Box,
  Card,
  Stack,
  useTheme,
} from '@mui/material';

interface MusicianCardProps {
  musician: JsonMusician;
  selected: boolean;
}

export const MusicianCard = ({ musician, selected }: MusicianCardProps) => {
  const theme = useTheme();
  const hoverStyles = {
    backgroundColor: theme.palette.action.hover,
    border: `1px solid ${theme.palette.primary.main}`,
  };

  return (
    <Card sx={{ width: 320, height: 300, ...(selected && hoverStyles) }}>
      <CardActionArea sx={{ height: '100%', padding: 3 }}>
        <Link
          to={buildRouteUrl({
            route: APP_ROUTES.BOOKING,
            pathParams: { musicianId: musician.id },
          })}
        >
          <Stack
            alignItems={'center'}
            justifyContent={'center'}
            textAlign={'center'}
          >
            <CardMedia
              component="img"
              sx={{ borderRadius: '50px', width: 160, height: 160 }}
              image={musician.avatar}
              alt={musician.name}
            />
            <Box pt={2}>
              <Typography variant="h2">{musician.name}</Typography>
              <Typography variant="subtitle2">
                {musician.services.join(', ')}
              </Typography>
            </Box>
          </Stack>
        </Link>
      </CardActionArea>
    </Card>
  );
};
