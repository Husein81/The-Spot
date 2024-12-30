import { FC } from "react";
import { Category } from "../../app/models/Category";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { openModal } from "../../app/redux/slice/modalSlice";
import CategoryForm from "./CategoryForm";
import WarningForm from "../WarningForm";
import { deleteCategory } from "../../app/api/categories";

interface Props {
  category: Category;
}

const CategoryCard: FC<Props> = ({ category }) => {
  const dispatch = useDispatch();

  const onOpenHandler = () => {
    dispatch(openModal(<CategoryForm id={category._id} />));
  };
  const onDeleteHandler = async () => {
    try {
      await deleteCategory(category._id as string);
    } catch (error) {
      console.log(error);
    }
  };
  const onWarningHandler = () => {
    dispatch(openModal(<WarningForm deleteItem={onDeleteHandler} />));
  };
  return (
    <Card
      sx={{
        borderRadius: 2,
        cursor: "pointer",
        "&:hover": { mt: -1.5, transition: "0.2s all" },
      }}
    >
      <Box
        component={"img"}
        src={category.imageUrls[0]}
        sx={{
          objectFit: "contain",
          width: { xs: 200, md: 300 },
          height: { xs: 200, md: 300 },
          borderRadius: 1,
        }}
      />
      <CardContent>
        <Typography variant="body2">{category.name}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button variant="contained" onClick={onOpenHandler}>
          <Edit />
        </Button>
        <Button variant="outlined" color="error" onClick={onWarningHandler}>
          <Delete />
        </Button>
      </CardActions>
    </Card>
  );
};
export default CategoryCard;
