/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { ColorSet } from "../../app/theme/Colors"
import { FC } from "react";
import { OrderPagination } from "../../app/model/pagination/OrderPagination";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
import { Pagination } from "../../app/model/pagination/Pagintation";
import Loader from "../Others/Loader";

type Props = {
    colors: ColorSet;
    isLoading: boolean;
    data: OrderPagination;
    pageModel: Pagination;
    refetch:() => any;
    setPageModel: React.Dispatch<React.SetStateAction<Pagination>>;
}
const OrderTable: FC<Props> = ({
    colors,
    data,
    pageModel,
    isLoading,
    refetch,
    setPageModel
}) => {

    if(isLoading) return <Loader/>;

    const onPaginationHandler = (pageModel:Pagination) => {
        setPageModel(pageModel);
    }
    const dataGridStyle = {
        height: 580,
        '& .MuiDataGrid-scrollbar':{
          width:0
        },
        backgroundColor:colors.white[600],
        textAlign : 'center',
        '& .MuiSvgIcon-root':{
          color:colors.gray[500]
        },
        '& .MuiDataGrid-overlay':{
          backgroundColor:colors.white[500],
        },
        
        '& .MuiDataGrid-row':{
          color:'#242424',
          '&:nth-of-type(even)':{
            backgroundColor:colors.white[500] ,
          }
        }
      }
      const initialState: GridInitialStateCommunity = {
        pagination:{
          paginationModel:{
            page:pageModel.page +1,
            pageSize:pageModel.pageSize,
          }
        }
      }

      const orders = data.orders.map(order => {
        return {
            id: order._id,
            ...order
        }
      })

      const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'price', headerName: 'Price', width: 150 },
        { field: 'quantity', headerName: 'Quantity', width: 150 },
        { field: 'total', headerName: 'Total', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
      ]
  return (
    <Box>
        <DataGrid
            sx={dataGridStyle}
            rows={orders}
            columns={columns}
            paginationMode="server"
            initialState={initialState}
            onPaginationModelChange={(model) => onPaginationHandler(model)}
            rowCount={data.totalCount}
            />
    </Box>
  )
}
export default OrderTable