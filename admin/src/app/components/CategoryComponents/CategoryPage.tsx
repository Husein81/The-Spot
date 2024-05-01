import { Button, Container, Grid, Typography } from "@mui/material"
import { useGetCategoriesQuery } from "../../redux/slices/categoryApi"
import Loader from "../Loader";
import CategortyTable from "./CategortyTable";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const navigate = useNavigate();
  const {data, isLoading} = useGetCategoriesQuery({});

  console.log(data)
  return (
    <Container>
      {isLoading ? 
      <Loader/> : 
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2">Categories</Typography>
            <Button onClick={() => navigate('/createCategory')}>Create Category</Button>
          </Grid>
          <Grid item xs={12}>
            <CategortyTable categories={data.categories}/>
          </Grid>
        </Grid>
      }
    </Container>
  )
}
export default CategoryPage