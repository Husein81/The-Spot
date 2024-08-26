
import { ColorSet } from "../../app/theme/Colors"
import { FC } from "react";

import { Pagination } from "../../app/model/pagination/Pagintation";
import Header from "../Others/Header";


type Props ={
    colors: ColorSet;
    pageModel: Pagination;
    searchTermHandler : (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAddHandler: () => void;
}

const ProductHeader: FC<Props> = ({
    colors,
    pageModel,
    searchTermHandler,
    onAddHandler}) => {

  return (
    <Header
        title="Products"
        colors={colors}
        pageModel={pageModel}
        onAddHandler={onAddHandler}
        searchTermHandler={searchTermHandler}/>
  )
}
export default ProductHeader