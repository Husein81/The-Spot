import { Grid2 as Grid } from "@mui/material";
import { Product } from "../../app/models/Product";
import { FC } from "react";
import ProductCard from "./ProductCard";
type Props = {
  products: Product[];
};
const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={1}>
      {products.map((product) => (
        <Grid size={{ xs: 6, sm: 3 }} key={product._id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};
export default ProductList;
