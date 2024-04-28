import { Box, Card, CardContent,Typography, useTheme } from "@mui/material";
import { token } from "../../../Theme";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PieChartComponent from "./Charts/PieChartComponent";

const DashboardCard = () => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);

  return (
    <Card sx={{width:290, bgcolor:colors.primary[400]}}> 
        <CardContent sx={{display:'flex',gap:10,justifyContent:'space-between', alignItems:'center',}}>
            <Box>
                <AttachMoneyIcon sx={{fontSize:24,color:colors.greenAccent[400]}}/>
                <Typography variant="h4">32,100$</Typography>
                <Typography variant="h5" color={colors.greenAccent[400]}>Sales</Typography>
            </Box>
            <PieChartComponent />
        </CardContent>
    </Card>
  )
}
export default DashboardCard;