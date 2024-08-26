import { Container, useTheme } from "@mui/material"
import ProductTable from "../../components/Products/ProductTable"
import { useGetProductsQuery } from "../redux/slice/productApi"
import { Pagination } from "../model/pagination/Pagintation"
import { useState } from "react"
import ProductHeader from "../../components/Products/ProductHeader"
import { token } from "../theme/Colors"
import { useDispatch } from "react-redux"
import { openModal } from "../redux/slice/modalSlice"
import ProductsForm from "../../components/Products/ProductsForm"

const Product = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const [pageModel, setPageModel] = useState<Pagination>({
    page:1,
    pageSize:10,
    searchTerm:'',
  })
  const {data, isLoading, refetch } = useGetProductsQuery({
    page:pageModel.page+1,
    pageSize:pageModel.pageSize,
    searchTerm:pageModel.searchTerm,
  })

  const onAddHandler = () => {
    dispatch(openModal(<ProductsForm colors={colors} refetch={refetch}/>));
  }
  
  return (
    <Container>
        <ProductHeader
          pageModel={pageModel}
          searchTermHandler={(e) => setPageModel({...pageModel, searchTerm:e.target.value})}
          onAddHandler={onAddHandler}
          colors={colors}
        />
        <ProductTable 
          colors={colors}
          isLoading={isLoading}
          refetch={refetch}
          pageModel={pageModel}
          setPageModel={setPageModel}
          data={data!}
        />
    </Container>
  )
}
export default Product