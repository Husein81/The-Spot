import { 
  IconButton,
    InputAdornment,
    Paper,
    Table,
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TextField,
    Typography
} from "@mui/material"
import { Product } from "../../models/Product"
import { Delete, Edit, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import agent from "../../api/agen";
import { useState } from "react";

interface Props {
  products: Product[];
}
interface SearchState {
  query: string;
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
  const [searchTerm, setSearchTerm] = useState<SearchState>({ query: ''});
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm({ query: e.target.value})
  }

  const filteredProducts = products.filter( product => 
    product.title.toLowerCase().includes(searchTerm.query.toLowerCase())
  );
  return (     
    <TableContainer  
    component={Paper}>
      <TextField
        sx={{px:3}}
        placeholder="search"
        type="text"
        margin="normal"
        value={searchTerm.query}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
        />
    <Table sx={{ maxHeight: 'calc(100vh - 150px)', overflowY:'auto', boxShadow:2}}>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>quantity</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody >
        {filteredProducts.length > 0 
        && filteredProducts.map(product => (
          <TableRow  key={product._id}>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product.price.toFixed(2)} $</TableCell>
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
    {filteredProducts.length ==0 && <Typography color={'error'} sx={{p:2,textAlign:'center'}}>Item Not Found</Typography>}
  </TableContainer>
  )
};
export default ProductTable