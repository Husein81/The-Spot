import { Container } from "@mui/material"
import { useEffect, useState } from "react"
import { Category } from "../models/Category"
import agent from "../api/agen";
import Loader from "../components/Loader";
import CategortyTable from "../components/CategoryComponents/CategortyTable";

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async() => {
    setIsLoading(true);
    try{
      const response = await agent.Categories.fetch();
      setCategories(response);
      setIsLoading(false);
    }catch(err){
      console.error(err);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchCategories();
  },[]);

  return (
    <Container>
      {isLoading ? 
      (<Loader/>) 
      : 
      (
        <CategortyTable categories={categories}/>
      )}
    </Container>
  )
}
export default CategoryPage