import { Button, List, ListItem,  ListItemText, Paper, Typography, useTheme } from "@mui/material"
import { token } from "../../../Theme"

interface Item {
    id: number; // Replace with appropriate data type for your IDs
    name: string;
    price: string;
    date: string;
}

const TransactionList = () => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const items: Item[] = [
        { id: 1, name: 'Item 1',date:'2024-24-1', price:'1000$' },
        { id: 2, name: 'Item 2',date:'2024-24-1', price:'1000$' },
        { id: 3, name: 'Item 3',date:'2024-24-1', price:'1000$' },
        { id: 3, name: 'Item 3',date:'2024-24-1', price:'1000$' },
        { id: 3, name: 'Item 3',date:'2024-24-1', price:'1000$' },
        { id: 3, name: 'Item 3',date:'2024-24-1', price:'1000$' },
        { id: 3, name: 'Item 3',date:'2024-24-1', price:'1000$' },
        { id: 3, name: 'Item 3',date:'2024-24-1', price:'1000$' },
      ];
  return (
    <Paper sx={{width:'100%', p:1, bgcolor:colors.primary[400]}}>
        <Typography variant="h6">Recent Transactions</Typography>
        <List sx={{ maxHeight: 190, overflowY: 'scroll' }}>
        {items.map((item) => (
            <ListItem key={item.id} sx={{display:'flex',color:colors.grey[400],bgcolor: colors.primary[500],my:1, justifyContent:'space-between'}}>
                <ListItemText primary={item.name} />
                <ListItemText primary={item.date} />
                <Button  variant="contained" sx={{bgcolor:colors.greenAccent[400]}}>{item.price}</Button>
            </ListItem>
        ))}
        </List>
    </Paper>
  )
}
export default TransactionList