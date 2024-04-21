import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { Category } from "../../models/Category"
import { Delete, Edit } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

interface Props {
    categories: Category[] | undefined;
}
const CategortyTable: React.FC<Props> = ({ categories}) => {
    const navigate = useNavigate();
  return (
    <Table sx={{minHeight:400, maxHeight: 'calc(100vh - 150px)', overflowY:'auto', boxShadow:2}}>
        <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {categories && categories.map((category) => (
                <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell sx={{p:0}}>
                        <IconButton onClick={() => navigate(`/updateProduct/${category._id}`)}>
                            <Edit/>
                        </IconButton>
                    </TableCell>
                    <TableCell sx={{p:0}}>
                        <IconButton>
                            <Delete />
                        </IconButton>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}
export default CategortyTable