import { 
  Box,
  IconButton,
  Typography,
  useTheme
} from "@mui/material"
import { Product } from "../../models/Product"
import { Delete, Edit} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDeleteProductMutation } from "../../redux/slices/productApi";
import { token } from "../../../Theme";
import { DataGrid, GridColDef } from "@mui/x-data-grid";


interface Props {
  products: Product[];
}

const ProductTable: React.FC<Props> = ({ products }) => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const navigate = useNavigate();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);
  }

  const columns: GridColDef<Product>[] = [
    { field: 'title', headerName: 'Title', width: 250},
    { field: 'price', headerName: 'Price', width: 100, type: 'number' }, // Set type for number formatting
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (_params) => (
        <IconButton onClick={() => navigate(`/updateProduct/${_params.id}`)}>
          <Edit /> 
        </IconButton>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: () => (
        <IconButton onClick={() => handleDelete}>
          <Delete /> 
        </IconButton>
      ),
    },
  ];
  const productsWithId = products.map((product) => ({
    ...product,
    id: product._id || product.title, // Use _id if available, otherwise use title
  }));
  return (    
    <Box > 
    <DataGrid 
      sx={{
        width:'fit-content',
        height:'fit-content',
        "& .MuiDataGrid-root":{
          border:'none'
        },
        "& .MuiDataGrid-cell":{
          borderBottom:'none'
        },
        "& .name-column--cell":{
          color: colors.greenAccent[300]
        },
        "& .MuiDataGrid-filler":{
          bgcolor:colors.blueAccent[700],
        },

        "& .MuiDataGrid-columnHeader ":{
          backgroundColor:colors.blueAccent[700],
          borderBottom:'none'
        },
        "& .MuiDataGrid-virtualScroll": {
          backgroundColor: colors.primary[400]
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop:'none',
          height:'fit-content',
          backgroundColor: colors.blueAccent[700]
        }
      }}
      rows={productsWithId} 
      columns={columns}         
      initialState={{
        pagination:{
          paginationModel: {
            pageSize: 6,
          }
        },
      }}
      pageSizeOptions={[6]}
      checkboxSelection 
      disableRowSelectionOnClick/>
    {products.length ==0 && <Typography color={'error'} sx={{p:2,textAlign:'center'}}>Item Not Found</Typography>}
  </Box>
  )
};
export default ProductTable