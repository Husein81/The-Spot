import { IconButton, useTheme } from "@mui/material"
import { Category } from "../../models/Category"
import { Delete, Edit } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { token } from "../../../Theme";

interface Props {
    categories: Category[] | undefined;
}
const CategortyTable: React.FC<Props> = ({ categories }) => {

    const navigate = useNavigate();
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const handleDelete = () => {

    }
    const columns: GridColDef<Category>[] = [
        {field:'name', headerName:"Name", width:300},
        {field: 'parentName', headerName:"Parent", width:300},
        {
            field: 'edit',
            headerName: 'Edit',
            width: 100,
            renderCell: (_params) => (
              <IconButton onClick={() => navigate(`/updateCategory/${_params.id}`)}>
                <Edit /> 
              </IconButton>
            ),
          },
          {
            field: 'delete',
            headerName: 'Delete',
            renderCell: () => (
              <IconButton onClick={() => handleDelete}>
                <Delete /> 
              </IconButton>
            ),
          },
    ];
    const categoriesWithId = categories?.map((category) => ({
        ...category,
        parentName: category.parent?.name,
        id: category._id
    }) ) 
  return (
    <DataGrid
        sx={{
          width:'fit-content',
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
        rows={categoriesWithId}
        columns={columns}
    />
  )
}
export default CategortyTable