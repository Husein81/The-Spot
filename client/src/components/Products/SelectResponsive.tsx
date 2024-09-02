import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/redux/slice/modalSlice";
import { FC } from "react";
import { Close } from "@mui/icons-material";

type Item = {
  value: string;
  label: string;
};
type Props = {
  title: string;
  items: Item[];
  selected: string;
  onSort: (sort: string) => void;
};

const SelectResponsive: FC<Props> = ({
  title,
  items,
  selected,
  onSort: onSortHandler,
}) => {
  const dispatch = useDispatch();
  const onSort = (selected: string) => {
    onSortHandler(selected);
    dispatch(closeModal());
  };
  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={() => dispatch(closeModal())}>
          <Close />
        </IconButton>
      </Box>
      <Box pb={1}>
        <List>
          {items.map((item) => (
            <ListItem
              key={item.value}
              value={item.value}
              sx={{ fontFamily: "roboto" }}
            >
              <ListItemButton
                sx={{
                  bgcolor: selected === item.value ? "primary.main" : "inherit",
                  color: selected === item.value ? "white" : "inherit",
                  "&.hover": {
                    bgcolor:
                      selected === item.value ? "inherit" : "primary.main",
                  },
                }}
                onClick={() => onSort(item.value)}
              >
                {item.label}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};
export default SelectResponsive;
