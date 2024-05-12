import { 
  Container, 
  FormControl, 
  FormGroup, 
  MenuItem, 
  Select, 
  SelectChangeEvent, 
  TextField 
} from "@mui/material"
import { useState } from "react"
import { Category } from "../../models/Category"
import { useGetCategoriesQuery } from "../../redux/slices/categoryApi"
import Loader from "../Loader"

const CategoryForm = () => {
  const [category, setCategory] = useState<Category>({
    name:''
  });
  const {data, isLoading} = useGetCategoriesQuery({});
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target
    setCategory({
      ...category,
      [name]: value
    });
  }

  if(isLoading) return <Loader color="white"/>
  return (
    <Container component={"form"} maxWidth={false}>
      <FormControl component={'fieldset'} variant="standard">
        <FormGroup>
            <TextField
              sx={{color:'white'}}
              name="name"
              label="Name"
              value={category.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory({...category, [e.target.name]:e.target.value})}
            />
            <Select
            label="Category"
            value={category.parent?.name}
            onChange={handleSelectChange}
            >
              {data?.categories.map((category) => (
                <MenuItem key={category._id}>{category.parent?.name}</MenuItem>
              ))}
            </Select>
        </FormGroup>
      </FormControl>
    </Container>
  )
}
export default CategoryForm