import { useEffect, useState } from "react"
import Loader from "../components/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
    Box, 
    Button,   
    IconButton, 
    InputAdornment, 
    MenuItem, 
    Select, 
    TextField, 
    Typography 
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'
import ProductCard from "../components/ProductCard";


const Search = () => {
    const navigate = useNavigate();
    const [products, setproducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [sideBarData, setSideBarDate] = useState({
        searchTerm:'',
        category:'',
        sort:'createdAt',
        order:'desc',
    });

    const handleChange = (e) =>{
        const { name, value } = e.target;
        if(name === "searchTerm"){
            setSideBarDate({...sideBarData, searchTerm: value});
        }
        if(name === "sort_order"){
            const sort = value.split("_")[0] || "createdAt";
            const order = value.split("_")[1] || 'desc';

            setSideBarDate({...sideBarData, sort, order});
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sideBarData.searchTerm);
        urlParams.set("sort", sideBarData.sort);
        urlParams.set("order", sideBarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
    
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTerm = urlParams.get("searchTerm");
        const sort = urlParams.get("sort");
        const order = urlParams.get("order");

        if(searchTerm || sort || order){
            setSideBarDate({
                searchTerm: searchTerm || '',
                sort: sort || 'createdAt',
                order: order || 'desc'
            });
        }
        const fetchproduct = async () => {
            setIsLoading(true);
            setShowMore(false);
            try{
                const searchQuery = urlParams.toString();
                const { data } = await axios.get(`/api/product/get?${searchQuery}`)
                if(data.products.length > 7){
                    setShowMore(true);
                }
                else setShowMore(false);
                
                setproducts(data.products)
                console.log(data.products.length)
            }catch(error){ console.error(error); }
            finally{
                setIsLoading(false);
            }
        }
        fetchproduct();
    },[location.search]);
    
    const onShowMoreClick = async () => {
        const startIndex = products.length;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set("startIndex", startIndex);
        const searchQuery = urlParams.toString();
        const { data } = await axios.get(`/api/product/get?${searchQuery}`);
        if (data.products.length < 9) setShowMore(false);

        setproducts([...products, ...data]);
    };
    if(isLoading) return( <Loader/> )
    
    return (
    <Box sx={{ display: 'flex',flexDirection:{xs:'column', md:'row'}, flexWrap:'wrap', gap:4,p:4, minHeight:'100vh'}}>
        <Box  sx={{ flexGrow:1}}>
                <Typography variant="h5" component="h1" sx={{ textAlign: 'center', mb: 2 }}>
                    Search Products
                </Typography>
                <form
                className="flex flex-col gap-8"
                onSubmit={handleSubmit}>
                <TextField
                label="Search"
                name="searchTerm"
                variant="outlined"
                fullWidth
                value={sideBarData.searchTerm}
                onChange={handleChange}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton type="submit">
                           <SearchIcon /> 
                       </IconButton>
                    </InputAdornment>
                  ),
                }}
                />
                <Select
                onChange={handleChange}
                defaultValue={"createdAt_desc"}
                name="sort_order"
                >
                    <MenuItem value="price_desc">Price high to low</MenuItem>
                    <MenuItem value="price_asc">Price low to high</MenuItem>
                    <MenuItem value="createdAt_desc">latest</MenuItem>
                    <MenuItem value="createdAt_asc">Oldest</MenuItem>
                </Select>
                <Button variant="contained" type="submit">
                    Search
                </Button>
                </form>
            </Box>
            <Box  sx={{display:'flex',flexWrap:'wrap',gap:4, }} >
                {products.length > 0 && products.map((product) => (
                    <ProductCard key={product._id} product={product}/>
                ))}
                {showMore == 'true' && (
                <Button variant="contained" onClick={onShowMoreClick}>
                    Show More
                </Button>
                )}
            </Box>
        
    </Box>
  )
}
export default Search