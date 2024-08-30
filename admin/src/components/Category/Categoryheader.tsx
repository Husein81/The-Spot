import { ColorSet } from "../../app/theme/Colors";
import { FC } from "react";
import Header from "../Others/Header";
import { Pagination } from "../../app/model/pagination/Pagintation";

type Props = {
  colors: ColorSet;
  pageModel: Pagination;
  onSearchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddHandler: () => void;
};
const CategoryHeader: FC<Props> = ({
  colors,
  pageModel,
  onSearchHandler,
  onAddHandler,
}) => {
  return (
    <Header
      title="Category"
      colors={colors}
      pageModel={pageModel}
      onAddHandler={onAddHandler}
      searchTermHandler={onSearchHandler}
    />
  );
};
export default CategoryHeader;
