/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Alert,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/redux/slice/modalSlice";
import { FC } from "react";

type Props = {
  deleteItem: () => void;
  refetch: () => any;
};

const DeletingForm: FC<Props> = ({ deleteItem, refetch }) => {
  const dispatch = useDispatch();

  const onCancelHandler = () => {
    dispatch(closeModal());
  };
  const onDeleteHandler = () => {
    deleteItem();
    refetch();
    dispatch(closeModal());
  };
  return (
    <Alert sx={{ p: 3, m: -2 }} severity="warning" variant="outlined">
      <FormControl component={"fieldset"} fullWidth>
        <FormLabel component={"legend"}>
          <Typography variant={"h4"}>
            Are you sure you want to delete this item?
          </Typography>
        </FormLabel>
        <FormGroup
          sx={{ display: "flex", flexDirection: "row", gap: 2, pt: 1 }}
        >
          <Button
            sx={{ flex: 1 }}
            variant={"outlined"}
            onClick={onCancelHandler}
          >
            Cancel
          </Button>
          <Button
            sx={{ flex: 1 }}
            variant={"contained"}
            onClick={onDeleteHandler}
          >
            Delete
          </Button>
        </FormGroup>
      </FormControl>
    </Alert>
  );
};
export default DeletingForm;
