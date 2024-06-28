import { Box, Card, CardContent, CardMedia, IconButton, TextField, Typography } from "@mui/material";
import { Product } from "../../apps/models/Product";
import { Add, Delete, Remove } from "@mui/icons-material";

interface CartItemProps {
    cartItem: Product;
    onRemove: (id: string) => void; 
    onUpdateQuantity: (id: string, quantity: number) => void;
}
const CartItem: React.FC<CartItemProps> = ({ cartItem, onRemove, onUpdateQuantity}) => {
    const handleUpdateQuantity = (_id: string,quantity:number) => {
        if(quantity > 0){
            onUpdateQuantity(_id, quantity);
        }else{
            onRemove(_id);
        }
    }
  return (
    <Card className="items-center gird sm:flex -mx-2">
        <CardMedia
          component="img"
          className="hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer items-center"
          sx={{width:191}}
          image={cartItem.imageUrls[0]}
          alt={cartItem.title}/>
        <CardContent >
            <Typography variant="h5">{cartItem.title}</Typography>
            <Typography variant="subtitle1" color={"text.secondary"}>
                ${cartItem.price.toFixed(2)}
            </Typography>
        </CardContent>
        <Box display="flex" alignItems={'center'} justifyContent={'space-between'} pl={1} pb={1}> 
            <Box display="flex"alignItems={'center'}>
                <IconButton onClick={() => handleUpdateQuantity(cartItem._id, cartItem.quantity + 1)}>
                    <Add/>
                </IconButton>
                <TextField
                    label="Quantity"
                    type="number"
                    value={cartItem.quantity}
                    sx={{width: 75, mr:2}}
                    />
                <IconButton onClick={() => handleUpdateQuantity(cartItem._id, cartItem.quantity - 1)}>
                    <Remove/>
                </IconButton>
            </Box>
            <IconButton onClick={() => onRemove(cartItem._id)}>
                <Delete/>
            </IconButton>   
        </Box>
    </Card>
  )
}
export default CartItem