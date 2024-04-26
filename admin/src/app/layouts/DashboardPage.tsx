import { Card, CardContent, Container, Typography} from "@mui/material"
import { useGetProductsQuery }  from '../redux/slices/productApi.ts'
const DashboardPage = () => {
  const { data } = useGetProductsQuery({});
  const nbOfProducts = data?.products || [];
  return (
    <Container>
      <Card sx={{width:'fit-content'}}>
        <CardContent>
          <Typography>
            Products<br/>
            {nbOfProducts.length}
          </Typography>
          
        </CardContent>
      </Card>
    </Container>
  )
}
export default DashboardPage;