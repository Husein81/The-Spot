import { Typography, Button, Container, Box, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import CartItem from './../components/CartItem'; // Import CartItem component
import { useCart } from './../context/CartContext'; // Import the context

const CartPage = () => {
  const { cartItems, clearCart } = useCart(); // Use destructuring for clarity

  const calculateTotal = () => {
    return cartItems.length > 0 ? cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) : 0;
  };

  return (
    
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: {xs:'column',md:'row'}, minHeight:'100vh', gap: 4, mt: 2 }}>
      <Box display={'flex'} flexDirection={'column'} gap={3}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Your Shopping Cart
        </Typography>
        <Link to={'/'} className="p-2 my-3 rounded-md bg-blue-500 text-white capitalize w-fit">
          Go Back
        </Link>
        {cartItems.length === 0 ? (
          <Box sx={{ mx: 'auto' }}>
            <Typography variant="h5" color={'error'}>
              Your cart is currently empty.
            </Typography>
          </Box>
        ) : (
          cartItems.map((item) => (
            <Box key={item._id}>
              <CartItem item={item} />
            </Box>
          ))
        )}
      </Box>
      <Box flexGrow={1}>
      {cartItems.length > 0 && (
        <Box sx={{  width: '100%', mt: 2 }}>
          <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">{calculateTotal().toFixed(2)}</Typography>
            </CardContent>
            <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="error" onClick={clearCart}>
                Clear Cart
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}

      {cartItems.length > 0 && (
        <Box sx={{  justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" color="primary" fullWidth>
            Checkout
          </Button>
        </Box>
      )}
      </Box>
    </Container>
  );
};

export default CartPage;
