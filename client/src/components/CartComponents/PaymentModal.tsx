import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { useState } from "react";


interface PaymentDetails{
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    name: string;
}
interface PaymentModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (PaymentDetails: PaymentDetails) => void;
}
const PaymentModal: React.FC<PaymentModalProps> = ({ open, onClose, onSubmit}) => {
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        name: ''
    })
    const handleSubmit = () => {
        onSubmit(paymentDetails);
        onClose();
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentDetails({...paymentDetails, [e.target.name]: e.target.value});
    }
  return (
    <Modal open={open} onClose={onClose}>
        <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
            <Typography variant="h4">Payment Details</Typography>
            <Box>
                <TextField 
                    label="Card Number" 
                    margin="dense"
                    variant="outlined" 
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField 
                    label="Name on Card"
                    margin="dense"
                    variant="outlined" 
                    name="name"
                    value={paymentDetails.name}
                    onChange={handleChange}
                    fullWidth/>
                <TextField 
                    label="Expiry Date" 
                    variant="outlined" 
                    margin="dense"
                    name="expiryDate"
                    value={paymentDetails.expiryDate}
                    onChange={handleChange}
                    fullWidth/>
                <TextField 
                    label="CVV" 
                    variant="outlined" 
                    margin="dense"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handleChange}
                    fullWidth/>
                <Box display="flex" justifyContent="space-between" >
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button variant="contained" color="primary" onClick={onClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    </Modal>
  )
}
export default PaymentModal