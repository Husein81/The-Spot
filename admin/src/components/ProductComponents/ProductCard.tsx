import React from "react";
import { Product } from "../../app/models/Product";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardMedia
        sx={{ cursor: "pointer", height:{xs:"360px",sm:"260px"} }} // Set a fixed height and objectFit
        component="img"
        image={product.imageUrls?.[0]}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="body1">{product.title}</Typography>
        <Typography color="text.secondary" variant="body2">
          {product.price}.00 $
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex" }}>
        <Button variant="contained">Buy</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
