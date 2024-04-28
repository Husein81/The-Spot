import { Container } from "@mui/material"
import { useEffect, useState } from "react"
import { Category } from "../models/Category";
import Loader from "../components/Loader";
import CategortyTable from "../components/CategoryComponents/CategortyTable";

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

 

  return (
    <Container>
      {isLoading ? 
      (<Loader/>) 
      : 
      (
        <>Hi</>
      )}
    </Container>
  )
}
export default CategoryPage