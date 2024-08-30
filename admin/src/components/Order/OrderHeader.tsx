import { FC } from "react";
import { ColorSet } from "../../app/theme/Colors";
import Header from "../Others/Header";
import { Pagination } from "../../app/model/pagination/Pagintation";

type Props = {
  colors: ColorSet;
  pageModel: Pagination;
  onSearchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddHandler: () => void;
};
const OrderHeader: FC<Props> = ({
  colors,
  pageModel,
  onSearchHandler,
  onAddHandler,
}) => {
  return (
    <Header
      title="Order"
      colors={colors}
      pageModel={pageModel}
      searchTermHandler={onSearchHandler}
      onAddHandler={onAddHandler}
    />
  );
};
export default OrderHeader;
