import { FC } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../app/redux/slice/modalSlice";
import { Info } from "@mui/icons-material";
import IconButton from "./theSpotComponents/IconButton";

interface Props {
  deleteItem: () => void;
}
const WarningForm: FC<Props> = ({ deleteItem }) => {
  const dispatch = useDispatch();
  const onCloseHandler = () => {
    dispatch(closeModal());
  };
  return (
    <div className="p-6">
      <div>
        <div className="text-center text-red-500">
          <Info color="disabled" sx={{ fontSize: "62px" }} />
        </div>
        <div className="flex flex-col text-sm justify-center text-center text-gray-500">
          <h6>
            Are you sure you want to delete this Item? Do you really want to
            delete this record? <br /> You will not be able to recover this item
          </h6>
        </div>
      </div>
      <div className="flex justify-between mt-4 ">
        <IconButton label="Cancel" onClick={onCloseHandler} />
        <IconButton
          label="Delete"
          className="bg-red-600"
          onClick={deleteItem}
        />
      </div>
    </div>
  );
};
export default WarningForm;
