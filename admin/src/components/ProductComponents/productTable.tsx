import { 
  Box,
  Typography,
} from "@mui/material"
import { Product } from "../../app/models/Product"
import { useNavigate } from "react-router-dom";
import { useDeleteProductMutation } from "../../app/redux/slices/productApi";
import CustomTable from "../CustomTable";


interface Props {
  products: Product[];
}

interface CustomTableCell {
  id: string;
  label: string;
  align?: 'left' | 'right' | 'center';
}
const ProductTable: React.FC<Props> = ({ products }) => {

  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);
  }

  const handleEdit = (productId: string) => {
    navigate(`/updateProduct/${productId}`);
  }
  const columns: CustomTableCell[] = [
    { id: '_id', label: 'ID'},
    { id: 'title', label: 'Title'},
    { id: 'price', label: 'Price' }, // Set type for number formatting
    { id: 'quantity', label: 'Quantity'},
  ];

  return (    
    <Box> 
      <CustomTable columns={columns} rows={products} onDelete={handleDelete} onEdit={handleEdit}/>
      {products.length ==0 && <Typography color={'error'} sx={{p:2,textAlign:'center'}}>Item Not Found</Typography>}
    </Box>
  )
};
export default ProductTable