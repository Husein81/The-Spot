import { FC } from "react";
import { Product } from "../../app/models/Product";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

type Props = {
  product: Product;
};
const ProductCard: FC<Props> = ({ product }) => {
  const image = product.imageUrls[0];
  return (
    <Card
      sx={{
        boxShadow: 1,
        border: 1,
        borderRadius: 1,
        borderColor: "#9a9a9a",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        p={1}
      >
        <Box
          component={"img"}
          src={image}
          alt={product.title}
          sx={{
            height: { xs: 150, sm: 200 },
            width: { xs: 150, sm: 200 },

            cursor: "pointer",
            "&:hover": {
              transform: "scale(.8)",
              transition: "transform 0.65s",
            },
          }}
        />
      </Box>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="body1">{product.title}</Typography>
        <Typography variant="body1">{product.price}</Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="contained">
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
};
export default ProductCard;
