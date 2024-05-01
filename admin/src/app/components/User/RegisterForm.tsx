/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Box, Button, Container, FormControl, FormGroup, FormLabel, IconButton, Link, TextField, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/User";
import { token } from "../../../Theme";
import { useRegisterMutation } from "../../redux/slices/userApi";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../../../firebase";
import { Upload } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";

const RegisterForm: React.FC = () => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [image, setImage] = useState<FileList | null>(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User>({
    username:'',
    password:'',
    email:'',
    avatar:''
  });

  const [register] = useRegisterMutation();

  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const storeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) =>{
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadUrl) => resolve(downloadUrl));
        }
      );
    });
  };

  const handleImageSubmit = () => {
    const newImage = image as FileList;
    if (newImage && !user.avatar) {
      setLoadingUpload(true);
      const promise: Promise<string>[] = [];
      for (let i = 0; i < 1; i++) {
        promise.push(storeImage(newImage.item(i) as File));
      }
      Promise.all(promise)
        .then((url) => 
          setUser({
            ...user,
            avatar: url[0]
          }))
        .then(() => setLoadingUpload(false))
        .catch(() => {
          setLoadingUpload(false);
          console.log("Image upload failed (2 mb max per image)");
        });
    } else {
      setLoadingUpload(false);
      console.log("You can only upload 1 image");
    }
  };
  console.log(user.avatar)
  const handleRemoveImage = (url: string) => {
    const imageName = url.split('/')[7].split('?')[0];
    const storage = getStorage(app); 
    const storageRef = ref(storage, imageName);
    deleteObject(storageRef)
      .catch(() => 
        console.log('Unable to delete the image')
      );  
    setUser({
      ...user,
      avatar: user.avatar?.replace(url,'')
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await register(user).unwrap();
      console.log(res)
      setError(null);
      dispatch(setCredentials(res));
      navigate("/dashboard");
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <Box bgcolor={colors.primary[500]} minHeight={'100vh'}>
      <Container component={'form'} onSubmit={handleSubmit} autoComplete="off" sx={{ width: 680, py: 5 , display: 'flex', gap: 1 }}>
        <FormControl component={'fieldset'} fullWidth>
          <FormLabel component={'legend'}>
            <Typography variant="h2" sx={{ color: colors.grey[500] }}>
              Register
            </Typography>
          </FormLabel>
          <FormGroup>
            <Box display={'flex'} gap={2} sx={{ py: 1 }}>
              <IconButton component="label" sx={{ display: 'inline-block', border: 1, borderRadius: 1, borderColor: '#aeaeae' }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  hidden 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.files)} 
                  multiple 
                />
                <Upload fontSize="large" />
              </IconButton>
              <Button variant="contained" color="secondary" onClick={handleImageSubmit}>
                {loadingUpload ? 'Uploading...' : 'Upload'}
              </Button>
            </Box>
            {user.avatar && 
              <Box
                className="flex justify-between p-3 border items-center rounded-md"
                width={200}
              >
                <img
                  src={user.avatar}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <Button
                  sx={{ '&:hover': { bgcolor: 'transparent' } }}
                  onClick={() => handleRemoveImage(user.avatar!)}
                >
                  Delete
                </Button>
              </Box>
            }
            <TextField
              name="username"
              sx={{ bgcolor: 'white', borderRadius: 1 }}
              value={user.username}
              placeholder="Username"
              variant="filled"
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              name="email"
              sx={{ bgcolor: 'white', borderRadius: 1 }}
              value={user.email}
              placeholder="Email"
              variant="filled"
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              sx={{ bgcolor: 'white', borderRadius: 1 }}
              type="password"
              margin="normal"
              placeholder="Password" 
              variant="filled"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            <Button variant="contained" type="submit">Submit</Button>
          </FormGroup>
          <Typography sx={{ color: colors.grey[500] }}>
            Don't have an account?
            <Link href='/login'> login</Link>
          </Typography> 
          <Typography sx={{ color: colors.redAccent[500] }}>{error}</Typography>
        </FormControl>
      </Container>
    </Box>
  );
};

export default RegisterForm;
