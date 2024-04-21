import axios, { AxiosResponse } from "axios";
import { Product } from "../models/Product";
import { PaginatedProduct } from "../models/pagentatedProducts";
import { Category } from "../models/Category";


axios.defaults.baseURL = '/api';

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: object) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: object) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Products = {
    fetch: () => requests.get<PaginatedProduct>(`/product/get?isAdmin=true`),
    fetchById: (id: string) => requests.get<Product>(`/product/${id}`),
    create: (product: Product) => axios.post<void>('/product/create', product),
    update: (product: Product) => axios.post<void>(`/product/${product._id}`, product),
    delete: (id: string) => axios.delete<void>(`/product/${id}`)
}

const Categories = {
    fetch: () => requests.get<Category[]>('/category'),
    create: (category: Category) => axios.post<void>('/catregory', category),
    update: (category: Category) => axios.put<void>(`/category/`, category),
    delete: () => axios.delete<void>('/category')
}

const agent = {
    Products,
    Categories
}

export default agent;