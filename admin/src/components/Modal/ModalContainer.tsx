import { Box, Modal, styled, useTheme } from "@mui/material"
import { token } from "../../Theme";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    content: JSX.Element;
}
const ModalContainer: React.FC<ModalProps> = ({open, onClose, content}) => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const ModalStyle = styled(Modal)(() => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary[400],
    }));
  return (
    <ModalStyle open={open} onClose={onClose}>
        <Box >
            {content}
        </Box>
    </ModalStyle>
  )
}
export default ModalContainer