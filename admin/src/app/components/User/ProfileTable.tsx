import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { User } from "../../models/User";
import { Box, IconButton, useTheme } from "@mui/material";
import { token } from "../../../Theme";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

interface Props{
    users: User[];
}

const ProfileTable: React.FC<Props> = ({ users }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = token(theme.palette.mode)
    const userwithId = users.map((user) => ({
        ...user,
        id: user._id || user.username
    }))

    console.log(userwithId)
    const handleDelete = () => {
        // Add your delete logic here
    };
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                sx={{
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
                rows={userwithId}
                columns={[
                    { field: 'username', headerName: 'Name', width: 150 },
                    { field: 'email', headerName: 'Email', width: 250 },
                    { field: 'isAdmin', headerName: 'Admin', width: 150 },
                    {
                        field: 'edit',
                        headerName: 'Edit',
                        width: 100,
                        renderCell: (_params) => (
                            <IconButton onClick={() => navigate(`/${_params.id}`)}>
                                <Edit /> 
                            </IconButton>
                        )
                    },
                    {
                        field: 'delete',
                        headerName: 'Delete',
                        width: 100,
                        renderCell: () => (
                            <IconButton onClick={handleDelete}>
                                <Delete /> 
                            </IconButton>
                        ),
                    },
                ]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    )
}
export default ProfileTable