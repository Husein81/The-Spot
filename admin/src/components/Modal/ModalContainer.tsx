import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import { closeModal } from "../../app/redux/slice/modalSlice";
import Modal from "./index";

const ModalContainer = () => {
  const { open, body } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const onCloseHandler = () => {
    dispatch(closeModal());
  };

  return (
    <Modal open={open} onClose={onCloseHandler}>
      {/* <ModalHeader title={title} onClose={onCloseHandler} /> */}
      <div>{body}</div>
    </Modal>
  );
};
export default ModalContainer;
