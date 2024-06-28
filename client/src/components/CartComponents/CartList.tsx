import { Box } from "@mui/material"
import { cartItem } from "../../apps/models/cart"
import CartItem from "./CartItem";

interface CartListProps {
    cart: cartItem[];
    onRemove: (id: string) => void;
    onUpdateQuantity: (id: string, quantity: number) => void;
}
const CartList: React.FC<CartListProps> = ({cart, onRemove, onUpdateQuantity}) => {
  return (
    <Box className="grid grid-cols-1" gap={3}>
    {cart.map((item) => (
        <Box key={item._id} >
            <CartItem cartItem={item} onRemove={onRemove} onUpdateQuantity={onUpdateQuantity}/>
        </Box>
    ))}
</Box>
  )
}
export default CartList