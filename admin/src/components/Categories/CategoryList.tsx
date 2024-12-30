import { FC } from "react";
import { Category } from "../../app/models/Category";
import Card from "../Products/Card";

interface Props {
  categories: Category[];
}
const CategoryList: FC<Props> = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Card key={category._id} item={category} type="category" />
      ))}
    </div>
  );
};
export default CategoryList;
