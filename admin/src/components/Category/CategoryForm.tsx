/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import { Button, Container, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import { Category } from "../../app/model/Category";

type Props ={
    id?:string;
    refetch: () => any;
 }
const CategoryForm:FC<Props> = () => {
    const [formData, setFormData] = useState<Category>({
        name:'',
        parent:'',
    });


  return (
    <Container component={'form'}>
        <FormControl component={'fieldset'} fullWidth>
            <FormLabel component={'legend'}>
                <Typography variant={'h4'}>
                    Category Form
                </Typography>
            </FormLabel>
            <TextField
                variant={'outlined'}
                label={'Category Name'}
                name={'name'}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                fullWidth
                sx={{mb:2}}
            />
            <TextField
                variant={'outlined'}
                label={'Parent Category'}
                name={'parent'}
                value={formData.parent}
                onChange={(e) => setFormData({...formData, parent: e.target.value})}
                fullWidth
                sx={{mb:2}}
            />
            <Button variant={'contained'}>Save</Button>
        </FormControl>
    </Container>
  )
}
export default CategoryForm