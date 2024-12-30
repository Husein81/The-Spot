import { Product } from "../../app/models/Product";
import { FC } from "react";
import Card from "./Card";

interface Props {
  products: Product[];
}
const ProductList: FC<Props> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((item) => (
        <Card key={item._id} item={item} />
      ))}
    </div>
  );
};
export default ProductList;
