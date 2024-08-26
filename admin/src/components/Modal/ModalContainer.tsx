import { Box, Modal, useTheme } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/redux/store";
import { closeModal } from "../../app/redux/slice/modalSlice";
import { token } from "../../app/theme/Colors";

const ModalContainer = () => {
    const theme=useTheme();
    const colors = token(theme.palette.mode);
    const dispatch = useDispatch();
    const { open, body} = useSelector((state: RootState) => state.modal);

    const closeHandler = () => {
        dispatch(closeModal());
    }
  return (
    <Modal
    open={open}
    onClose={closeHandler} 
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.1)'
    }}
    >
        <Box 
            maxWidth={450} 
            width={'100%'} 
            bgcolor={colors.white[500]} 
            borderRadius={1}
            p={2}
            boxShadow={2}>
            {body}
        </Box>
    </Modal>
  )
}
export default ModalContainer