/* eslint-disable no-unused-vars */
import { lazy, useEffect, useState } from "react";
import { useAuth } from "../../context/authProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { LuUpload } from "react-icons/lu";
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable
} from 'firebase/storage'
import { app } from '../../firebase';
import { IoIosClose } from "react-icons/io";

const NewProduct = () => { 
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [images, setImages] = useState([]);
    const [error, setError] = useState(false);
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title:'',
        category:'',
        price: '',
        countInStock: '', 
        description:'',
        imageUrls:[]
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const storeImage = async (image) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage(app);
          const fileName = new Date().getTime() + image.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, image);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => reject(error),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                resolve(downloadURL)
              );
            }
          );
        });
    };
    const handleImageSubmit = (e) => {
        if (images.length > 0 && images.length + formData.imageUrls.length < 7) {
          setLoadingUpload(true);
          setUploadError(false);
          const promises = [];
          for (let i = 0; i < images.length; i++) {
            promises.push(storeImage(images[i]));
          }
          Promise.all(promises)
            .then((urls) => {
              setFormData({
                ...formData,
                imageUrls: formData.imageUrls.concat(urls),
              });
              console.log(images)
              setUploadError(false);
              setLoadingUpload(false);
            })
            .catch((err) => {
              setUploadError("Image upload failed (2 mb max per image)");
              setLoadingUpload(false);
            });
        } else {
          setUploadError("You can only upload 6 images per listing");
          setLoadingUpload(false);
        }
      };
      
    const handleImageChange = (e) =>{
      setImages([...e.target.files]);
    };

    const getCategories = async () =>{
        const { data } =await axios.get('/api/category');
        setCategories(data);
    }
    useEffect(() => {
        getCategories();
    },[]);

    const handleRemoveImage = (url, index) => {
        const imageName = url.split("/")[7].split("?")[0];
        const storage = getStorage(app);
        const storageRef = ref(storage, imageName);
        deleteObject(storageRef).catch((err) =>
          setUploadError("Unable to delete image")
        );
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(formData.imageUrls.length < 1){
            setError("You must upload at least one image");
            return;
        }
        try{  
            setLoading(true);
            const info = {...formData, userRef: currentUser._id }
            
            const { data } = await axios.post('/api/product/create', info);
            setLoading(false);
            setError(null);
            navigate('/admin/products');
        }catch(error){
            setError(error.response.data.message);
            setLoading(false);
        }
    }
  return (
    <Layout>
        <main className="flex flex-col gap-6 max-w-4xl">
        <h2 className="text-3xl">New Product</h2>
        <form className="flex flex-col-reverse gap-4 sm:flex-row" onSubmit={handleSubmit}>
          <div className="flex flex-col flex-1 gap-4 ">
            <input 
            type="text"
            name="title"
            className="rounded-md py-1 px-3 border text-lg "
            placeholder="title"
            onChange={handleChange}
            value={formData.title}
            />
            <select 
            name="category"
            className="border p-2 rounded-md"  
            value={formData.category}
            onChange={handleChange}>
                <option>Uncategories </option>
                {categories.map((category,index) => (
                  <option value={category._id} key={index}>{category.name}</option>
                ))}
            </select>

            <input 
            type="number"
            min="0"
            name="price" 
            placeholder="price"
            onChange={handleChange}
            className="border rounded-md p-2 text-lg " />

            <input 
            type="number"
            min="0"
            name="countInStock" 
            value={formData.countInStock}
            onChange={handleChange}
            className="border rounded-md p-2 text-lg "  />
            <textarea 
            name="description"
            onChange={handleChange}
            className="border rounded-md p-2 text-lg" 
            rows={'3'}
            placeholder="description">
            </textarea>
            <button 
            disabled={loading}
            className="rounded-md mt-5 py-2 bg-primary hover:bg-primaryLight text-white">
              {loading ? 'Saving...' : 'Save' }
            </button>
            {error && <p className="text-red-500">{error}</p>}

          </div>
          <div className="flex flex-col gap-4 flex-1">
              <label 
              className=" boreder rounded-md bg-gray-300 p-3 w-full text-slate-100 cursor-pointer text-center"
              value="File">
              <input 
                type="file" 
                name="images"
                accept="images/*" 
                multiple
                className="hidden"
                onChange={handleImageChange}
                />
                <p>Choose File</p>
              </label>
              <button
                disabled={loadingUpload}
                onClick={handleImageSubmit}
                className="text-slate-100 p-3 text-center bg-gray-400 border rounded-md"
                >
                {
                  loadingUpload 
                  ?
                  "Uploading..."
                  : 
                  (
                    <div className="flex flex-row justify-center items-center gap-1">
                      <LuUpload/>
                      Upload
                    </div>
                  )
                }
              </button> 
            <div className="flex flex-row flex-1 overflow-hidden max-w-fit gap-4">
            {formData.imageUrls.length > 0 && 
             formData.imageUrls.map((url, index) => (
               <div key={index} className="">
                  <button
                  type="button"
                  onClick={() => handleRemoveImage(url, index)}
                  className="p-2 text-red-700 rounded-lg uppercase hover:opacity-75">
                  <IoIosClose/>
                  </button>
                  <img 
                  onLoad={lazy}
                  src={url} 
                  className=" rounded-lg  w-32 h-32" alt="" />
                </div>
            ))}
            </div>
          </div>
          
        </form>
        </main>
    </Layout>
  )
}
export default NewProduct