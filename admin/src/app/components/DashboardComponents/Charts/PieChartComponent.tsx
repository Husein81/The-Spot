import { Box } from "@mui/material"
import { PieChart } from "@mui/x-charts"

const PieChartComponent = () => {
  return (
    <Box>
        <PieChart
            width={180}
            height={90}
            series={[
                {
                    id:"s1",
                    data: [
                        { label: 'A1', value: 100 },
                        { label: 'A2', value: 300 },
                        { label: 'B1', value: 100 },
                        { label: 'B2', value: 100 },
                        { label: 'B3', value: 40 }, ],
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