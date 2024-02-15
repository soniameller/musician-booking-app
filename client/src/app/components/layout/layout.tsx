import { ReactNode } from 'react';
import { Box, Toolbar, AppBar } from '@mui/material';
import { useIsSmall } from '../../hooks/use-screen-sizes';

export interface PageWrapperProps {
  children: ReactNode;
}

export const Layout = ({ children }: PageWrapperProps) => {
  const isSmall = useIsSmall();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ height: 88, backgroundColor: '#111827' }} />
      </AppBar>
      <Box px={isSmall ? 5 : 25} py={5}>
        {children}
      </Box>
    </Box>
  );
};
