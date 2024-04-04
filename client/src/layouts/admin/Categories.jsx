/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import Layout from "../../components/AdminComponents/Layout"
import { useAuth } from "../../context/authProvider";
import axios from "axios";

const Categories = () => {
    const [name, setName] = useState('');
    const [edit, setEdit] = useState(null);
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategort] = useState('');
    const { loading, setLoading, error,setError } = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const data = { name, parentCategory };
            if(edit){
                data._id = edit._id;
                await axios.put(`/api/category`, data);
                setEdit(null);
            }else {
            await axios.post('/api/category', data);
            setCategories(data)
            }
        setName('');
        setLoading(false);
        setError(null);
        }catch(error){
            setLoading(false)
            setError(error.response.data.message);
        }
    };

    const listCategories = async() => {
        try{
            const { data } =await axios.get('/api/category');
            console.log(data)
            setCategories(data);
        }catch(error){
            console.log(error)
        }
    };
    const EditCategory = (category) => {
        setEdit(category);
        setName(category.name);
        setParentCategort(category.parent?._id);
    };
    const deleteCategory = async (category) => {
        const  { _id } = category;
        await axios.delete(`/api/category?_id=`+_id);
    }
    useEffect(() => {
        listCategories();
    },[])
return (
    <Layout>
        <div className="flex gap-10 px-4">
            <div className="flex-grow">

        <h2 className="text-3xl my-5">Categories</h2>
        <p className="text-primary text-lg mb-2">
            {edit ? `Edit category ${edit.name}` : 'Create new category'}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col max-w-md gap-3 mb-6">
            <input 
            type="text" 
            className="p-3 rounded-md border" 
            value={name}
            onChange={ e => setName(e.target.value)}
            placeholder="Category name" />
            <select
            onChange={e => setParentCategort(e.target.value)} 
            value={parentCategory}
            className="border p-3 rounded-md">
                <option value={0}>No parent category</option> 
                {categories.length > 0 && categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <button 
            disabled={loading}
            className="bg-primary py-2 rounded-md hover:bg-primaryLight text-slate-100">
                {loading ? 'Loading...' : 'Save'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
            </div>
        <table className="border shadow flex-grow mt-10">
            <thead>
                <tr className="bg-gray-300 uppercase">
                    <td className="px-3 text-left">Category name</td>
                    <td className="px-3 text-left">Parent Category</td>
                    <td className="px-3 text-left"></td>
                    <td className="px-3 text-left"></td>
                </tr>
            </thead>
            <tbody>
                {categories.length > 0 && categories.map((category) => (
                    <tr key={category._id} className="border capitalize bg-white">
                        <td className=" text-slate-900 p-1">{category.name}</td>
                        <td className=" text-slate-900 p-1">{category?.parent?.name}</td>
                        <td className=" text-slate-900 p-1">
                            <button
                            onClick={() => EditCategory(category)}
                            className="flex items-center gap-2 font-semibold text-slate-100 bg-primary rounded-md py-2 px-3 capitalize ">
                                Edit
                            </button>
                        </td>
                        <td className=" text-slate-900 px-2 py-1">
                            <button
                              onClick={() => deleteCategory(category)}
                              className="flex items-center gap-2 font-semibold text-slate-100 bg-primary rounded-md py-2 px-3 capitalize ">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    </Layout>
  )
}
export default Categories