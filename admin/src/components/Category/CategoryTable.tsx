/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CategoriesPagination } from "../../app/model/pagination/CaregoriesPagination";
import { FC } from "react";
import { ColorSet } from "../../app/theme/Colors";
import { Pagination } from "../../app/model/pagination/Pagintation";
import Loader from "../Others/Loader";
import { useDispatch } from "react-redux";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
import { Delete, Edit } from "@mui/icons-material";
import CategoryForm from "./CategoryForm";
import { openModal } from "../../app/redux/slice/modalSlice";
import DeletingForm from "../Others/DeletingForm";
import { useDeleteCategoryMutation } from "../../app/redux/slice/categoryApi";

type Props = {
  colors: ColorSet;
  isLoading: boolean;
  refetch: () => any;
  pageModel: Pagination;
  setPageModel: React.Dispatch<React.SetStateAction<Pagination>>;
  data: CategoriesPagination;
};
const CategoryTable: FC<Props> = ({
  data,
  isLoading,
  pageModel,
  colors,
  setPageModel,
  refetch,
}) => {
  const dispatch = useDispatch();
  const [deleteCategory] = useDeleteCategoryMutation();
  if (isLoading) return <Loader />;

  const onPaginationHandler = (pageModel: Pagination) => {
    setPageModel(pageModel);
  };

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

  const openFormHandler = (id: string) => {
    dispatch(openModal(<CategoryForm id={id} refetch={refetch} />));
  };

  const deleteHandler = async (id: string) => {
    dispatch(
      openModal(
        <DeletingForm deleteItem={() => deleteCategory(id)} refetch={refetch} />
      )
    );
  };
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "imageUrls",
      headerName: "Image",
      width: 200,
      renderCell: (params) => {
        return (
          <Box
            component={"img"}
            src={params.row.imageUrls}
            sx={{ width: 50, height: 50 }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <Box>
            <IconButton onClick={() => openFormHandler(params.row.id)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => deleteHandler(params.row.id)}>
              <Delete />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const categories = data.categories.map((category) => {
    return {
      id: category._id,
      ...category,
    };
  });
  console.log(categories);
  return (
    <Box>
      <DataGrid
        sx={dataGridStyle}
        getRowId={(row) => row.id}
        paginationMode="server"
        initialState={initialState}
        rows={categories}
        columns={columns}
        rowCount={data.totalCount}
        onPaginationModelChange={(model) => onPaginationHandler(model)}
      />
    </Box>
  );
};
export default CategoryTable;
