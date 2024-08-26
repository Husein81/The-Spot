import { AppBar, Box, IconButton, Typography } from "@mui/material"
import SearchBar from "./SearchBar"
import { Add } from "@mui/icons-material"
import { ColorSet } from "../../app/theme/Colors"
import { FC } from "react"
import { Pagination } from "../../app/model/pagination/Pagintation"

type Props = {
    title: string;
    colors: ColorSet;
    pageModel: Pagination;
    onAddHandler: () => void;
    searchTermHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Header: FC<Props> = ({
    title,
    colors,
    pageModel,
    onAddHandler,
    searchTermHandler
}) => {
  return (
    <AppBar  position="static" elevation={1} sx={{bgcolor:colors.black[500], borderRadius:1 , mb:2}}> 
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} p={'2px'}>
            <Box>
                <Typography variant="h3" p={2} sx={{color:colors.white[500]}}>
                   {title}
                </Typography>
            </Box>
            <Box 
                width={'100%'}
            >
                <SearchBar
                    colors={colors}
                    pageModel={pageModel}
                    searchTermHandler={searchTermHandler}
                />
            </Box>
            <Box mx={2} onClick={onAddHandler}>
                <IconButton>
                    <Add color="secondary"/>
                </IconButton>
            </Box>
        </Box>
    </AppBar>
  )
}
export default Header