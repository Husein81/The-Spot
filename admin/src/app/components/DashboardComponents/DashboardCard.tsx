/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography, useTheme } from "@mui/material";
import { token } from "../../../Theme";
import PieChartComponent from "./Charts/PieChartComponent";

import React from "react";

interface Progress{
  label:string,
  value:number
}
interface Props {
  title: string;
  subTitle: string;
  progress: Progress[];
  icon?: any;
}

const DashboardCard: React.FC<Props> = ({ title, subTitle, progress, icon }) => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);

  return (
    <Box width={"100%"} m="0 45px"  >
      <Box display={'flex'} justifyContent={'space-between'} m={0} gap={5} alignItems={'center'}>
        <Box>
          <Typography variant="h5" py={1} sx={{color:colors.greenAccent[500]}}>{icon}</Typography> 
          <Typography 
          variant="h4"
          fontWeight="Bold"
          sx={{color:colors.grey[100]}}> 
            {title}
          </Typography>
        </Box>
        <Box>
          <PieChartComponent progress={progress}/>
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={'space-between'} mt="2px" pb={2}>
        <Typography 
        variant="h5"
        sx={{color:colors.greenAccent[500]}}>
          {subTitle}
        </Typography>
      </Box>
    </Box>
  )
}
export default DashboardCard;