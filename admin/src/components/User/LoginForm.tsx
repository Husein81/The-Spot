import { Button, Container, FormControl, FormGroup, FormLabel, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { Login } from "../../app/model/User"
import { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLoginMutation } from "../../app/redux/slice/userApi";
import { setUser } from "../../app/redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/redux/slice/modalSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const [formData, setFormData] = useState<Login>({
        username: '',
        password: ''
    });

    const [showpassword, setShowPassword] = useState(false);

    const [login] = useLoginMutation();

    const showPasswordHandler = () => {
        setShowPassword(!showpassword);
    }

    const closeHandler = () => {
        dispatch(closeModal());
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            dispatch(setUser(await login(formData).unwrap()));
            closeHandler(); 
            navigate('/dashboard');
        }catch(err){    
            console.error(err); 
        }
    }
  return (
    <Container component={'form'} autoComplete="off" sx={{p:1}} onSubmit={submitHandler}>
        <FormControl component={'fieldset'} fullWidth>
            <FormLabel component="legend">
                <Typography variant="h3" >
                    Login
                </Typography>
            </FormLabel>
            <FormGroup>
                <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    margin="dense"
                    onChange={changeHandler}
                />
                <TextField
                    type={showpassword ? 'text' : 'password'}
                    label="Password"
                    name="password"
                    value={formData.password}
                    sx={{
                        mt:1,
                        mb:2
                    }}
                    onChange={changeHandler}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton 
                                aria-label="toggle password visibility"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={showPasswordHandler}>
                                    {showpassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}/>
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </FormGroup>
        </FormControl>
    </Container>
  )
}
export default LoginForm