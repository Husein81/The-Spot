import { Box, Container, Typography } from "@mui/material"
import OrderTable from "./OrderTable"
import { useGetOrdersQuery } from "../../app/redux/slices/orderSlice";
import Loader from "../Loader";

const OrderPage = () => {
  const {data, isLoading} = useGetOrdersQuery();

  const orders = data || [];

  if(isLoading){
    return <Loader/>
  }
  return (
    <Container maxWidth="md">
      <Box>
        <Typography variant="h2"  py={2} sx={{textTransform:'uppercase'}}>Orders</Typography>
      </Box>
      <Box>
        <OrderTable orders={orders}/>
      </Box>
    </Container>
  )
}
export default OrderPage