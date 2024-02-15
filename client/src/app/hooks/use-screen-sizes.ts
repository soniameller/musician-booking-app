import { useMediaQuery, useTheme } from '@mui/material';

export const useIsSmall = (): boolean => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  return isSmall;
};

export const useIsMedium = (): boolean => {
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  return isMedium;
};
