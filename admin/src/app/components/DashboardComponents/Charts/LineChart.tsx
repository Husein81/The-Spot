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
              data: [1, 2, 3, 2, 1],
            },
            {
                type: 'line',
                data: [1, 1, 3, 2, 1],
              },
            {
              type: 'line',
              data: [4, 3, 1, 3, 4],
            },
          ]}
          xAxis={[
            {
              data: ['A', 'B', 'C', 'D', 'E','F','G'],
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