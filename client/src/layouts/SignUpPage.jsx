import { useState } from "react";
import { useAuth } from "../context/authProvider";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { 
    Box, 
    Button, 
    Container,
    TextField 
} from "@mui/material";


const SignUpPage = () => {
    const navigate = useNavigate();
    const { setCurrentUser, error, setError, loading,setLoading } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            setLoading(true);
            const { data } = await axios.post("/api/auth/signup",formData);
            
            setCurrentUser(data);
            setError(null);
            navigate('/sign-in');
        }catch(error){
            setError(error.response.data.message);
        }finally{
            setFormData({
                username: '',
                email: '',
                password: ''
            });
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
            <h1 className="text-semibold text-4xl text-center">Sign Up</h1>
            <Box
            component="form"
            noValidate
            sx={{mt: 1,p:1}}
            onSubmit={handleSubmit}
            >
                <TextField 
                margin="normal"
                fullWidth
                label='username'
                type="text" 
                name="username" 
                defaultValue="Username"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}/>
                <TextField
                margin="normal"
                fullWidth 
                label="Email"
                type="text"
                name="email" 
                autoComplete="email"
                defaultValue="Email"
                value={formData.email}
                onChange={handleChange} />
                <TextField 
                fullWidth
                margin="normal"
                label="password"
                type="password" 
                name="password" 
                defaultValue="password" 
                value={formData.password}
                autoComplete="current-password"
                onChange={handleChange}
                />
                <Button
                disabled={loading}
                type="submit"
                margin="normal"
                fullWidth
                variant='contained'
                className="bg-blue-600 p-3 rounded-lg text-slate-100">
                    {loading ? 'Loading...' : 'Sign Up'}
                </Button>
                {error && <p className="text-red-500">{error}</p>}
                <hr />
            </Box>
        
            <Box 
            margin={'normal'}
            display={'flex'}
            gap={1}
            >
                <p>Already have an account?</p>
                <Link 
                to={"/sign-in"}
                >
                <span  className="text-blue-700 hover:underline">
                    Sign In
                </span>
                </Link>
            </Box>
            </Box>
        </Container>
    );
}

export default SignUpPage;