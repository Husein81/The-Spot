import { Box, Button, Typography, useTheme } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../components/User/LoginForm";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { openModal } from "../redux/slice/modalSlice";
import { token } from "../theme/Colors";

const Home = () => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const dispatch = useDispatch(); 
    const { user } = useSelector((state: RootState) => state.auth);
    console.log(user);
    const handleOpenModal = (body: JSX.Element) => {
      dispatch(openModal(body));
    }
    
  return (
    <Box 
      sx={{
        height:'100vh',
        width:'100%',
        background: `linear-gradient(45deg, ${colors.black[500]} 30%, ${colors.black[400]} 70%)`,
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        gap:4,
        m:-1,
        alignItems:'center',
      }}>
        <Typography variant='h3' align='center' color='white'>Welcome To The Inventory System</Typography>
        {user === null ?
         (<Button variant='contained' color="secondary" onClick={()=> handleOpenModal(<LoginForm/>)}>
            Login
          </Button>) 
          : 
          (
            <Box display={'flex'} flexDirection={'column'} gap={1}>
              <Typography variant='h3' color='white'>
                <Link to='/dashboard'>Go To Dashboard</Link>
              </Typography>
              <Button variant={"contained"} color="secondary" onClick={() =>{}}>Logout</Button>
            </Box>
          )
        }

    </Box>
  )
}
export default Home