import {  Container, Grid, Typography } from "@mui/material"
import Loader from "../Loader";
import ProfileTable from "./ProfileTable";
import { useGetUsersQuery } from "../../app/redux/slices/userApi";

const ProfilePage = () => {
    const { data: users, isLoading } = useGetUsersQuery(1);
    console.log(users?.users)
    if(isLoading) return <Loader color="white"/>
  return (
    <Container maxWidth="md">
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h2"  py={2}>Users</Typography>
            </Grid>
            <Grid item xs={12}>
                <ProfileTable users={users?.users ?? []}/>
            </Grid>
        </Grid>
    </Container>
  )
}
export default ProfilePage