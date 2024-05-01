/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Paper, Typography, useTheme } from "@mui/material"
import { ChartContainer, ChartsXAxis, ChartsYAxis, LinePlot, MarkPlot } from "@mui/x-charts"
import { token } from "../../../../Theme";

const LineChart = () => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const Container =  ChartContainer;
    const sizingProps = { width: 500, height: 190 };
  return (
    <Box >
        <Paper sx={{ width: 630, height: 230,bgcolor:colors.primary[400],pt:1,px:2 }} >
        {/* @ts-ignore */}
        <Typography color={colors.grey[400]}>Revenue</Typography>
        <Typography color={colors.greenAccent[400]}>$53200000</Typography>
        <Container
          series={[
            {
              type: 'line',
              data: [1*10, 2*10, 3*10, 1.2*10, 2.9*10, 1*10, 1*10, 3*10, 2*10, 1*10,1*10,] ,
            },
            {
                type: 'line',
                data: [1*10, 1*10, 3*10, 2*10, 1*10,4*10, 3*10, 1.3*10, 3.2*10, 4.1*10],
              },
            {
              type: 'line',
              data: [4*10, 3*10, 1.3*10, 3.2*10, 4.1*10,1*10, 2*10, 3*10, 1.2*10, 2.9*10,],
            },
          ]}
          xAxis={[
            {
              data: ['Jan', 'Feb', 'March', 'Apirl', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              scaleType: 'point',
              id: 'x-axis-id',
            },
          ]}
          {...sizingProps}
        >
        <LinePlot/>
        <MarkPlot/>
        <ChartsYAxis position="left"/>
        <ChartsXAxis position="bottom"  axisId="x-axis-id" />
        </Container>
        </Paper>
    </Box>
  )
}
export default LineChart;