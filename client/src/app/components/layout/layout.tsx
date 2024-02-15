import { ReactNode } from 'react';
import { Box, Toolbar, AppBar } from '@mui/material';
import { useIsLarge } from '../../hooks/use-screen-sizes';

export interface PageWrapperProps {
  children: ReactNode;
}

export const Layout = ({ children }: PageWrapperProps) => {
  const isLarge = useIsLarge();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ height: 88, backgroundColor: '#111827' }} />
      </AppBar>
      <Box px={isLarge ? 5 : 25} py={5}>
        {children}
      </Box>
    </Box>
  );
};
