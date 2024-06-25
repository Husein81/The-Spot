import { Container, FormControl, FormGroup, FormLabel, Typography, useTheme } from "@mui/material"
import { token } from "../../Theme";

const ProfileForm = () => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=> {
      e.preventDefault();
    }
  return (
    <Container component={'form'} onSubmit={handleSubmit} 
      autoComplete="off" sx={{ width: 680, py: 5 , display: 'flex', gap: 1 }}>
        <FormControl component={'fieldset'} fullWidth>
        <FormLabel component={'legend'}>
            <Typography variant="h2" sx={{ color: colors.grey[500] }}>
              Profile
            </Typography>
          </FormLabel>
        </FormControl>
        <FormGroup>
          
        </FormGroup>
    </Container>
  )
}
export default ProfileForm;