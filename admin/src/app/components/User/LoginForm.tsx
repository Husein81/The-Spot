/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Container, FormControl, FormGroup, FormLabel, TextField, Typography, useTheme } from "@mui/material"
import { token } from "../../../Theme";
import React, { useEffect, useState } from "react";

import { User } from "../../models/User";
import { useLoginMutation} from "../../redux/slices/userApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";
import Loader from "../Loader";


const LoginForm = () => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state: any) => state.auth);
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/dashboard";

    useEffect(() => {
      if (userInfo) {
        navigate(redirect);
      }
    }, [userInfo, redirect, navigate]);
  
    const [user, setUser] = useState<User>({
      username:'',
      password:'',
    });
    const [login, {isLoading: loadingLogin}] = useLoginMutation();
    const [error, setError] = useState<string | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setUser({
        ...user,
        [name]: value
      })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      try{
        const  res  = await login(user).unwrap();
        if(res.isAdmin === false){
          throw new Error("Unauthorized access");
        }
        setError(null)
        dispatch(setCredentials(res));
        navigate(redirect);
      }catch(error: any){
        if(error === "Unauthorized access"){
          setError("Unauthorized access");
        }else setError("Uncorrect username or password  ");

        console.log(error);
      }
    }
  return (
      <Box bgcolor={colors.primary[500]} minHeight={'100vh'}>
        <Container component={'form'} onSubmit={handleSubmit} autoComplete="off" sx={{width:680, py:5 ,display:'flex',gap:1}}>
          <FormControl component={'fieldset'} fullWidth>
            <FormLabel component={'legend'}>
              <Typography variant="h2" sx={{color:colors.grey[500]}}>
                Login
              </Typography>
            </FormLabel>
            <FormGroup>
              <TextField
                error={error ? true : false}
                required
                name="username"
                sx={{borderRadius:1}}
                value={user.username}
                placeholder="Username"
                variant="filled"
                margin="normal"
                onChange={handleChange}
              />
              <TextField
                required
                error={error ? true : false}
                sx={{ borderRadius:1}}
                type="password"
                margin="normal"
                placeholder="Password" 
                variant="filled"
                name="password"
                value={user.password}
                onChange={handleChange}
                />
              <Button variant="contained" type="submit" sx={{my:1}} disabled={loadingLogin && true} >{loadingLogin ? <Loader /> : 'Submit'}</Button>
            </FormGroup>
            <Typography sx={{color:colors.grey[500]}}>
              Don't have an account?
              <Link to='/register'> Register</Link>
            </Typography> 
            <Typography sx={{color:colors.redAccent[500]}}>{error ? error : ''}</Typography>
          </FormControl>
        </Container>
      </Box>
  )
}
export default LoginForm;