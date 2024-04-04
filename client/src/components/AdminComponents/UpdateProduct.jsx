/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Layout from "./Layout"
import { useAuth } from '../../context/authProvider';
import { lazy, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LuUpload } from 'react-icons/lu';
import {
  deleteObject,
  getDownloadURL,
  ref,
  getStorage,
  uploadBytesResumable
} from "firebase/storage";
import { app } from "../../firebase";
import { IoIosClose } from "react-icons/io";


const UpdateProduct = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [images, setImages] = useState([]);
    const [uploadError, setUploadError] = useState(false);
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState({
      title:'',
      description:'',
      price: '',
      countInStock: '', 
      category:'',
      imageUrls:[]
      });
      
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

    const getProduct = async () => {
        try {
          const response = await axios.get(`/api/product/${id}`);
          const productData = response.data;
          console.log(productData)
          setFormData({
            title: productData.title,
            description: productData.description,
            price: productData.price,
            countInStock: productData.countInStock,
            category: productData.category,
            imageUrls: productData.imageUrls
          });
        } catch (error) {
          console.error("Error fetching product:", error);
        }
    }
    
  useEffect(() => {
    getProduct();
  },[id]);

  const getCategories = async () =>{
    const { data } =await axios.get('/api/category');
    setCategories(data);
  }
  useEffect(() => {
    getCategories();
  },[]);


  const handleImageUpload = (e) => {
    if (images.length > 0  && images.length + formData.imageUrls.length < 7) {
      console.log("HI")
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


  const handleRemoveImage = (url, index) => {
    const imageName = url.split("/")[7].split("?")[0];
    const storage = getStorage(app);
    const storageRef = ref(storage, imageName);
    deleteObject(storageRef).catch((err) =>
      setUploadError("Unable to delete image")
    );
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i != index),
    });
  };
  const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    };

  const handleSubmit = async (e) =>{
      e.preventDefault();
      if (formData.imageUrls.length < 1) {
        setError("You must upload atleast 1 image");
        return;
      }
      try{
        setLoading(true);
          
        const { data } = await axios.put(`/api/product/${id}`,{
          ...formData,
          userRef: currentUser._id
        });
        setLoading(false);
        setError(null);
        navigate('/admin/products');
      }catch(error){
        setError(error.response.data.message);
        setLoading(false);
      }
  };
  return (
    <Layout>
        <main className="flex flex-col gap-6 mt-5">
            <h2 className="text-3xl ">Update Product</h2>
            <form className="flex flex-col max-w-4xl gap-4 sm:flex-row" onSubmit={handleSubmit}>
            <div className="flex flex-col flex-1 gap-4">
            <input 
            type="text"
            name="title"
            className="rounded-lg py-1 px-3 border text-lg "
            placeholder="title"
            onChange={handleChange}
            value={formData.title}
            />
            <select 
            name="category"
            className="border p-2 rounded-lg"  
            onChange={handleChange}
            value={formData.category}>
                <option value=''>Uncategories </option>
                {categories.map((category,index) => (
                    <option value={category._id} key={index}>{category.name}</option>
                ))}
            </select>            

            <input 
            type="number"
            min="0"
            name="price" 
            value={formData.price}
            placeholder="price"
            onChange={handleChange}
            className="border rounded-lg py-1 px-3 text-lg " />

            <input 
            type="number"
            min="0"
            name="countInStock" 
            value={formData.countInStock}
            placeholder="count in stock"
            onChange={handleChange}
            className="border rounded-lg py-1 px-3 text-lg "  />
            <textarea 
            name="description"
            onChange={handleChange}
            value={formData.description}
            className="border rounded-lg p-2 text-lg" 
            rows={'3'}
            placeholder="description">
            </textarea>
            <button 
            disabled={loading}
            className="rounded-lg px-3 py-2 bg-primary hover:bg-primaryLight text-white">
              {loading ? 'Saving...' : 'Save' }
            </button>
            {error && <p className="text-red-500">{error}</p>}
            </div>
            
            <div className=" flex flex-col flex-1 gap-2">
              <label 
              className=" boreder rounded-lg bg-gray-300 p-3 w-full text-slate-100 cursor-pointer text-center"
              >
              <input 
                type="file" 
                name="images"
                accept="images/*" 
                multiple
                className="hidden"
                onChange={(e) => setImages(e.target.files)}
                />
                <p>Choose File</p>
              </label>
              {uploadError && <p className="text-red-700 text-sm">{uploadError}</p>}
              <button
                type="button"
                disabled={loadingUpload}
                onClick={handleImageUpload}
                className="text-slate-100 p-3 text-center bg-gray-400 border rounded-lg"
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
                formData.imageUrls.map((url, index) => 
                <div key={index} className="inline-block ">
                  <button 
                  type="button"
                  className="p-2 text-red-700 rounded-lg uppercase hover:opacity-75"
                  onClick={() => handleRemoveImage(url, index)}>
                  <IoIosClose/>
                  </button>
                  <img 
                  loading={lazy}
                  src={url} 
                  className=" rounded-lg  w-32 h-32"  />
                </div>
                )}
              </div>

            </div>
            </form>
        </main>
    </Layout>
  )
}
export default UpdateProduct;