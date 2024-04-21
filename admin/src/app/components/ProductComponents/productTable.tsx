import { 
  IconButton,
    Paper,
    Table,
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow 
} from "@mui/material"
import { Product } from "../../models/Product"
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import agent from "../../api/agen";

interface Props {
  products: Product[]
}

const ProductTable: React.FC<Props> = ({ products }) => {
  const navigate = useNavigate();
  const deleteProduct = async (id: string) => {
    try{
      console.log(id)
      await agent.Products.delete(id);
    }catch(err){
      console.error(err);
    }
  }
  const handleDelete = (id: string) => {
    deleteProduct(id);
  }
  return (
    <TableContainer  
    component={Paper}>
    <Table sx={{minHeight:400, maxHeight: 'calc(100vh - 150px)', overflowY:'auto', boxShadow:2}}>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>quantity</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.length > 0 
        && products.map(product => (
          <TableRow  key={product._id}>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product.price}.00 $</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell sx={{p:0}}>
              <IconButton onClick={() => navigate(`/updateProduct/${product._id}`)}> 
                <Edit/>
              </IconButton>
            </TableCell>
            <TableCell sx={{p:0}}>
              <IconButton onClick={() => handleDelete(product._id)}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
};
export default ProductTable