import { CircularProgress } from '@mui/material';
import React from 'react';

interface Props{
  color?: string;
}
const Loader: React.FC<Props> = ({ color = "#1976d2" }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress sx={{color:`${color}`}}/>
    </div>
  );
};

export default Loader;
