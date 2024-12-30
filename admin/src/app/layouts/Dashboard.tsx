import CategoryList from "@/components/Categories/CategoryList";
import ProductList from "@/components/Products/ProductList";

import { useGetAllProducts } from "../api/products";
import { useGetCategories } from "../api/categories";
import IconButton from "@/components/theSpotComponents/IconButton";
import Loader from "@/components/theSpotComponents/Loader";

const Dashboard = () => {
  const { isPending: isPendingProduct, data: products } = useGetAllProducts({
    page: 1,
    pageSize: 5,
    searchTerm: "",
  });

  const { isPending: isPendingCategory, data: categories } = useGetCategories({
    page: 1,
    pageSize: 5,
    searchTerm: "",
  });

  if (isPendingProduct || isPendingCategory) {
    return <Loader size="lg" />;
  }

  return (
    <div>
      <div className="mb-4">
        <div className="flex justify-between">
          <h2 className="text-2xl mb-6 font-semibold">Products</h2>
          <IconButton label="View All" className="mb-4 px-6 " />
        </div>
        <ProductList products={products?.products || []} />
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <h2 className="text-2xl mb-6 font-semibold">Categories</h2>
          <IconButton label="View All" className="mb-4 px-6 " />
        </div>
        <CategoryList categories={categories?.categories || []} />
      </div>
    </div>
  );
};
export default Dashboard;
