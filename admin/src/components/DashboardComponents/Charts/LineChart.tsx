/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, useTheme } from "@mui/material"
import { ResponsiveLine } from '@nivo/line';
import { token } from "../../../Theme";
const LineChart = () => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);

    const data = [
      {
        id: 'Sales',
        data: [
          { x: "Jan", y: 221 },
          { x: "Feb", y: 430 },
          { x: "March", y: 236 },
          { x: "April", y: 382 },
          { x: "May", y: 240 },
          { x: "June", y: 139 },
          { x: "July", y: 240 },
          { x: "Aug", y: 139 },
          { x: "Sep", y: 240 },
          { x: "Oct", y: 139 },
          { x: "Nov", y: 240 },
          { x: "Dec", y: 139 },
        ],
      },
    ];
  
  return (
    <Box sx={{height:'250px', width:'100%', borderRadius:1}} bgcolor={colors.primary[400]}>
      <ResponsiveLine
        colors={colors.greenAccent[400]}
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'month',
          legendOffset: 36,
          legendPosition: 'middle',
          truncateTickAt: 0
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Sales',
          legendOffset: -40,
          legendPosition: 'middle',
          truncateTickAt: 0
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
                {
                on: 'hover',
                style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                }
                }
            ]
          }
        ]}
      />
    </Box>
  )
}
export default LineChart;