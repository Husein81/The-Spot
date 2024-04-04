/* eslint-disable react/prop-types */
import { Typography, IconButton, TextField, Grid, Card, CardContent } from '@mui/material';
import { useCart } from './../context/CartContext'; // Import the context
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import AddCircle from '@mui/icons-material/AddCircle';

const CartItem = ({ item }) => {
  const { removeItem, updateQuantity } = useCart();

  const handleIncrement = () => {
    updateQuantity(item._id, item.qty + 1);
  };
  const handleRemove = () => {
    removeItem(item._id);
}

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (isNaN(newQuantity) || newQuantity < 1) {
      return; 
    }
    updateQuantity(item._id, newQuantity);
  };

  return (
        <Grid item xs={11} key={item._id}>
            <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <img src={item.imageUrls} className="w-24 p-2" alt="" />
                    <Grid item xs={6}>
                      <Typography variant="body1">{item.title}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        label="Quantity"
                        type="number"
                        InputLabelProps={{ shrink: true }}
                        value={item.qty}
                        onChange={(e) => handleQuantityChange(item._id,e)}
                        min={1}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <IconButton onClick={() => handleIncrement(item._id)}>
                        <AddCircle/>
                      </IconButton>
                      <IconButton onClick={() => handleRemove(item._id)}>
                        <RemoveCircle/>
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
             </Card>
        </Grid>
  );
};

export default CartItem;
