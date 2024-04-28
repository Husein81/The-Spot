import { Box, Container, Grid, Typography, useTheme } from "@mui/material"
import TopBar from "../components/TopBar.tsx";
import DashboardCard from "../components/DashboardComponents/DashboardCard.tsx";
import LineChart from "../components/DashboardComponents/Charts/LineChart.tsx";
import { token } from "../../Theme.ts";
import TransactionList from "../components/DashboardComponents/TransactionList.tsx";

const DashboardPage = () => {
  const theme = useTheme();
    const colors =  token(theme.palette.mode);
  return (
    <Container>
      <TopBar/>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography pt={2} variant="h3" textTransform={'uppercase'}>Dasboard</Typography>
          <Typography variant="h6" fontWeight={600} sx={{color:colors.greenAccent[600]}}>Welcome to your dashboard</Typography>   
        </Grid>

      <Grid item xs={12} sx={{width:'880px'}}>
        <Box display={'flex'} gap={2} > 
          <DashboardCard />
          <DashboardCard />
          <DashboardCard />
          <DashboardCard />  
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display={'flex'} gap={2}>
          <LineChart/>
          <TransactionList/>
        </Box>
      </Grid>
      </Grid>
    </Container>
  )
}
export default DashboardPage;