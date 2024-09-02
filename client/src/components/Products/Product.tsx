import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../app/redux/slice/productApi";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product } = useGetProductQuery(id!);
  return <div>{product?.title}</div>;
};
export default Product;
