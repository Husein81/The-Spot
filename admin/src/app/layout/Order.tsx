import { Container, useTheme } from "@mui/material"
import { token } from "../theme/Colors";
import OrderHeader from "../../components/Order/OrderHeader";
import { Pagination } from "../model/pagination/Pagintation";
import { useState } from "react";
import { useGetOrdersQuery } from "../redux/slice/orderApi";
import OrderTable from "../../components/Order/OrderTable";

const Order = () => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);

    const [pageModel, setPageModel] = useState<Pagination>({
        page:1,
        pageSize:10,
        searchTerm:'',
    });

    const { data: orders, isLoading, refetch } = useGetOrdersQuery({
        page: pageModel.page,
        pageSize: pageModel.pageSize,
        searchTerm: pageModel.searchTerm,
    });
    console.log(orders);
  return (
    <Container>
        <OrderHeader
            colors={colors}
            pageModel={pageModel}
            onSearchHandler={(e) => console.log(e.target.value)}
            onAddHandler={() => console.log('Add')}/>
        <OrderTable
            colors={colors}
            data={orders}
            pageModel={pageModel}
            isLoading={isLoading}
            refetch={refetch}
            setPageModel={setPageModel}/>
    </Container>
  )
}
export default Order