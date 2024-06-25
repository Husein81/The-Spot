import React from "react";
import { User } from "../../app/models/User";
import { Box, } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import CustomTable from "../CustomTable";
import { useDeleteUserMutation } from "../../app/redux/slices/userApi";

interface Props{
    users: User[];
}

interface ColumnsTableCell{
    id:string;
    label:string;

}
const ProfileTable: React.FC<Props> = ({ users }) => {
    const navigate = useNavigate();
    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = async (userId: string) => {
        await deleteUser(userId);
    };
    const handleEdit = (userId: string) => {
        navigate(`/updateUser/${userId}`);
    }
    const columns: ColumnsTableCell[] =[
        { id: '_id', label: 'ID'},
        { id: 'username', label: 'Username'},
        { id: 'email', label: 'Email'},
    ]
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <CustomTable columns={columns} rows={users} onDelete={handleDelete} onEdit={handleEdit}/>
        </Box>
    )
}
export default ProfileTable