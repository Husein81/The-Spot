/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC } from "react";
import { Pagination } from "../../app/model/pagination/Pagintation";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
import { ProductPagination } from "../../app/model/pagination/ProductPagination";
import { Delete, Edit } from "@mui/icons-material";
import { useDeleteProductMutation } from "../../app/redux/slice/productApi";
import { ColorSet } from "../../app/theme/Colors";
import { useDispatch } from "react-redux";
import { openModal } from "../../app/redux/slice/modalSlice";
import ProductsForm from "./ProductsForm";
import Loader from "../Others/Loader";
import DeletingForm from "../Others/DeletingForm";
import { useGetCategoriesQuery } from "../../app/redux/slice/categoryApi";

type Props = {
  colors: ColorSet;
  data: ProductPagination;
  isLoading: boolean;
  pageModel: Pagination;
  refetch: () => any;
  setPageModel: React.Dispatch<React.SetStateAction<Pagination>>;
};
const ProductTable: FC<Props> = ({
  colors,
  isLoading,
  data,
  pageModel,
  setPageModel,
  refetch,
}) => {
  const dispatch = useDispatch();
  const [deleteProduct] = useDeleteProductMutation();
  const { data: cat } = useGetCategoriesQuery({
    page: 1,
    pageSize: 1000,
    searchTerm: "",
  });
  if (isLoading) return <Loader />;

  const paginationHandler = (pageModel: { page: number; pageSize: number }) => {
    setPageModel(pageModel);
  };

  const openFormHandler = (id: string) => {
    dispatch(
      openModal(<ProductsForm id={id} colors={colors} refetch={refetch} />)
    );
  };

  const deleteHandler = async (id: string) => {
    dispatch(
      openModal(
        <DeletingForm deleteItem={() => deleteProduct(id)} refetch={refetch} />
      )
    );
  };

  const categories = cat?.categories || [];
  const initialState: GridInitialStateCommunity = {
    pagination: {
      paginationModel: {
        page: pageModel.page + 1,
        pageSize: pageModel.pageSize,
      },
    },
  };
  const dataGridStyle = {
    height: 580,
    "& .MuiDataGrid-scrollbar": {
      width: 0,
    },
    backgroundColor: colors.white[600],
    textAlign: "center",
    "& .MuiSvgIcon-root": {
      color: colors.gray[500],
    },
    "& .MuiDataGrid-overlay": {
      backgroundColor: colors.white[500],
    },

    "& .MuiDataGrid-row": {
      color: "#242424",
      "&:nth-of-type(even)": {
        backgroundColor: colors.white[500],
      },
    },
  };
  const products = data.products.map((product) => {
    return {
      id: product._id,
      ...product,
      categoryName: categories.find((cat) => cat._id === product.category)
        ?.name,
    };
  });

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 100 },
    {
      field: "imageUrls",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <Box
          component={"img"}
          src={params.row.imageUrls[0]}
          sx={{ width: 50, height: 50 }}
        />
      ),
    },
    { field: "description", headerName: "Description", width: 250 },
    { field: "cost", headerName: "Cost", width: 100 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    {
      field: "categoryName",
      headerName: "Category",
      width: 100,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 100,
      renderCell: (params) => (
        <Box>{new Date(params.row.updatedAt).toLocaleDateString()}</Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => openFormHandler(params.row.id)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => deleteHandler(params.row.id)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <DataGrid
        rows={products}
        getRowId={(row) => row.id}
        columns={columns}
        sx={dataGridStyle}
        initialState={initialState}
        paginationMode="server"
        paginationModel={{
          page: pageModel.page,
          pageSize: pageModel.pageSize,
        }}
        pageSizeOptions={[10, 50, 100]}
        onPaginationModelChange={(model) => paginationHandler(model)}
        rowCount={data?.totalCount}
      />
    </Box>
  );
};
export default ProductTable;
