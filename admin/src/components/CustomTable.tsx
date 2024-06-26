/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton,
  styled,
  useTheme
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { token } from '../Theme';

interface Column {
  id: string;
  label: string;
}

interface Row {
  [key: string]: any;
}

interface CustomTableProps {
  columns: Column[];
  rows: Row[];
  onEdit?: (row: string) => void;
  onDelete?: (row: string) => void;
}
const CustomTable: React.FC<CustomTableProps> = ({ columns, rows, onEdit, onDelete }) => {

    const theme = useTheme();
    const colors = token(theme.palette.mode);

    const TableHeadStyled = styled(TableHead)(() => ({
        backgroundColor: colors.blueAccent[400],
    }));

    const TableBodyStyled = styled(TableBody)(() => ({
        backgroundColor: colors.primary[400],
    }))
  return (
    <TableContainer component={Paper}  >
      <Table>
        <TableHeadStyled>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
            {onDelete && onEdit ? 
             ( 
             <>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
             </>
            ): <></>
            }
          </TableRow>
        </TableHeadStyled>
        <TableBodyStyled>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.id}>{row[column.id]}</TableCell>
              ))}
              {onDelete && onEdit ?
                 (<>
                  <TableCell>
                  <IconButton onClick={() => onEdit && onEdit(row[columns[0].id])}>
                    <Edit/>
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onDelete && onDelete(row[columns[0].id])}>
                    <Delete/>
                  </IconButton>
                </TableCell>
                 </> 
                ) : <></>
              }
            </TableRow>
          ))}
        </TableBodyStyled>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
