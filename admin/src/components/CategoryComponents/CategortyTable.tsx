import { Category } from "../../app/models/Category"
import { useNavigate } from "react-router-dom"
import CustomTable from "../CustomTable";
import { useDeleteCategoryMutation } from "../../app/redux/slices/categoryApi";

interface Props {
  categories: Category[];
}

interface ColumnsTableCell{
  id:string;
  label:string;
}

const CategortyTable: React.FC<Props> = ({ categories }) => {
    const navigate = useNavigate();
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleEdit = (categoryId: string) => {
      navigate(`/updateCategory/${categoryId}`);
    }
    const handleDelete = async (categoryId: string) => {
      try{
        await deleteCategory(categoryId);
      }catch(err){
        console.log(err);
      }
    }
    const columns: ColumnsTableCell[] = [
      { id: '_id', label: 'ID'},
      { id:'name', label: 'Name'},
      { id:'parent?.name', label: 'Parent'},
    ]
  return (
    <CustomTable columns={columns} rows={categories} onDelete={handleDelete} onEdit={handleEdit}/>
  )
}
export default CategortyTable