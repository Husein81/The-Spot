import { Container, useTheme } from "@mui/material"
import CategoryHeader from "../../components/Category/Categoryheader"
import { token } from "../theme/Colors";
import { useState } from "react";
import { Pagination } from "../model/pagination/Pagintation";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/slice/modalSlice";
import CategoryForm from "../../components/Category/CategoryForm";

const Category = () => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    
    const [pageModel, setPageModel] = useState<Pagination>({
        page:1,
        pageSize:10,
        searchTerm:'',
    })
    const dispatch = useDispatch();

    const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPageModel({...pageModel, searchTerm:e.target.value});
    }
    const onAddHandler = () => {
        dispatch(openModal(<CategoryForm  refetch={()=>{}}/>));
    }
  return (
    <Container>
        <CategoryHeader
            onSearchHandler={onSearchHandler}
            onAddHandler={onAddHandler}
            colors={colors}
            pageModel={pageModel}/>
    </Container>
  )
}
export default Category