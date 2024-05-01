import { Box } from "@mui/material"
import { PieChart } from "@mui/x-charts"
import React from "react";

interface Progress{
  label:string,
  value:number
}
interface Props{
  progress: Progress[];
}
const PieChartComponent: React.FC<Props> = ({ progress }) => {
  return (
    <Box>
        <PieChart
            width={180}
            height={90}
            series={[
                {
                    id:"s1",
                    data: progress,
                    innerRadius: 20,
                    outerRadius: 30 , 
                }
            ]}
            slotProps={{
                legend: { hidden: true },
              }}
            />
    </Box>
  )
}
export default PieChartComponent