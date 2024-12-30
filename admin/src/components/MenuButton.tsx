import {
  Badge,
  badgeClasses,
  IconButton,
  IconButtonProps,
} from "@mui/material";
import { FC } from "react";

interface Props extends IconButtonProps {
  showBadge: boolean;
}
const MenuButton: FC<Props> = ({ showBadge = false, ...props }) => {
  return (
    <Badge
      color="error"
      variant="dot"
      invisible={!showBadge}
      sx={{ [`.${badgeClasses.badge}`]: { right: 2, top: 2 } }}
    >
      <IconButton size="small" {...props} />
    </Badge>
  );
};
export default MenuButton;
