import { Button, Container, Grid, Typography, useTheme } from "@mui/material"
import { useGetCategoriesQuery } from "../../redux/slices/categoryApi"
import Loader from "../Loader";
import CategortyTable from "./CategortyTable";
import { useNavigate } from "react-router-dom";

import { token } from "../../../Theme";

const CategoryPage = () => {
  const navigate = useNavigate();
  const theme =  useTheme();
  const colors = token(theme.palette.mode);
  const {data, isLoading} = useGetCategoriesQuery({});

  console.log(data)
  return (
    <Container>
      {isLoading ? 
      <Loader/> : 
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2">Categories</Typography>
            <Button sx={{
              bgcolor:colors.greenAccent[500],
              "&:hover":{bgcolor:colors.greenAccent[400]}, 
              mt:2 }} 
              variant="contained" 
              onClick={() => navigate('/createCategory')
              }>Create Category</Button>
          </Grid>
          <Grid item xs={12}>
            <CategortyTable categories={data?.categories}/>
          </Grid>
        </Grid>
      }
    </Container>
  )
}
export default CategoryPage