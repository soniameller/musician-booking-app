import { useMediaQuery, useTheme } from '@mui/material';

export const useScreenSizes = (): {
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
} => {
  const theme = useTheme();

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  const isLarge = useMediaQuery(theme.breakpoints.down('lg'));

  return { isSmall, isMedium, isLarge };
};
