import { Box, CircularProgress } from '@mui/material';
import React from 'react';

interface Props{
  color?: string;
}
const Loader: React.FC<Props> = ({ color = "primary" }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',minHeight:'100vh', height:'fit-content' }}>
      <CircularProgress sx={{color:`${color}`}}/>
    </Box>
  );
};

export default Loader;
