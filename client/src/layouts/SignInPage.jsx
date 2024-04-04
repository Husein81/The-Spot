import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";
import {
    Box,
    Button,
    Container,
    TextField
} from '@mui/material';
import { useState } from 'react';
import axios from "axios";


const SignInPage = () => {
    
    const navigate = useNavigate();
    const { loading, setLoading, error, setError, setCurrentUser  } = useAuth();

    const [formData,setFormData] = useState({
        username:'',
        password:''
    });

    const handleChange = (e) =>{
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setLoading(true);
           
            const { data } = await axios.post("/api/auth/signin", formData);
            const signInTime = new Date().getTime();
            localStorage.setItem('currentUser', JSON.stringify(data));
            localStorage.setItem('signInTime',signInTime);

            setCurrentUser(data);

            setLoading(false);
            setError(null);
            if(data.rest.isAdmin === true){
               navigate('/admin');
            }
           else navigate('/');
        }catch(error){
            setError(error.response.data.message);
        }finally {
            setLoading(false);
        }
    };

  return (
    <Container
       maxWidth={'xs'}
       sx={{minHeight:'100vh',display:'flex', alignItems:'centet', justifyItems:'center'}}
       
    >
        <Box
        sx={{
            border:1,
            height:'fit-content',
            borderColor:'#ddd',
            borderRadius:2,
            mt:8,
            py:2,
            px:3
           }}>

        <h1 className="text-4xl font-semibold text-center">
            Sign In
        </h1>
        <Box 
        margin={"normal"}
        component={'form'}
        onSubmit={handleSubmit}>

            <TextField 
            margin="normal"
            fullWidth
            label="username"
            type="text" 
            name="username" 
            variant="outlined"
            placeholder="Username" 
            style={{borderRadius:'20px'}}
            onChange={handleChange} 
            value={formData.username} autoComplete="user-name"/>

            <TextField 
            fullWidth
            margin="normal"
            label="password"
            type="password" 
            name="password" 
            placeholder="Password" 
            className="rounded-lg border p-3" 
            onChange={handleChange} 
            value={formData.password}
            autoComplete="current-password"
            />
            <Button 
            disabled={loading}
            fullWidth
            margin="normal"
            variant='contained'
            type="submit"
            >
            { loading ? 'Loading...' : 'Sign In'}
            </Button>
            {error && <p className="text-red-500 mt-5">{error}</p> }
            <hr />
        </Box>
        <Box
        margin={'normal'}
        display={'flex'}
        gap={1}
        >
        <p>Don&apos;t have an account? </p>
        <Link 
        to={"/sign-up"}
        >
            <span
            className="text-blue-700 hover:underline"
            >
            Sign up
            </span>
        </Link>
      
            </Box>
        </Box>
    </Container>
  )
}
export default SignInPage;