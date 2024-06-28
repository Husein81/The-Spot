import { Box, Button, Container, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../apps/redux/hooks";
import { removeFromCart, updateQuantity } from "../../apps/redux/Slice/cartSlice";
import { useNavigate } from "react-router-dom";
import CartList from "./CartList";
import { useState } from "react";
import PaymentModal from "./PaymentModal";


interface PaymentDetails{
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    name: string;
}

const CartPage = () => {
    const navigate = useNavigate();
    const cart = useAppSelector(state => state.cart.cart);
    const dispatch = useAppDispatch();
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const handleRemoveFromCart = (id: string) => {
        dispatch(removeFromCart(id));
    }

    const handleUpdateQuantity = (id: string, quantity: number) => {
        dispatch(updateQuantity({_id:id, quantity}));
    }
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    }

    const handleCheckout = () => {
        setIsPaymentModalOpen(true);    
    }
    const handlePaymentSubmit = (paymentDetails: PaymentDetails) => {
        console.log(paymentDetails);
        setIsPaymentModalOpen(false);
    }

  return (
    <Container sx={{py:12}}>
        <Typography variant="h3" gutterBottom>Shopping Cart</Typography>
        <Button sx={{my:2}} variant="contained" color="primary" onClick={() => navigate('/products')}>
            Continue Shopping
        </Button>
        {
            cart.length === 0 ?
            <Typography variant="h5">Your cart is empty</Typography>
            : 
            (
                <Box className={'grid grid-cols-1 sm:grid-cols-2 gap-10'}>
                    <Box>
                        <CartList cart={cart} onRemove={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity}/>
                    </Box>
                    <Box >
                        <Box display={'grid'} gap={1}>    
                            <Typography variant="h5">Total: ${getTotalPrice()}</Typography>
                            <Button variant="contained" color="primary" onClick={handleCheckout}>
                                Checkout
                            </Button>
                            <PaymentModal 
                                open={isPaymentModalOpen}
                                onClose={() => setIsPaymentModalOpen(false)}
                                onSubmit={handlePaymentSubmit}
                            />
                        </Box>
                    </Box>
                </Box>
            )
        }
    </Container>
  )
}
export default CartPage