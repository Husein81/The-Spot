/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cancel } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { FC } from "react";
import { ColorSet } from "../../app/theme/Colors";

type Props = {
  colors: ColorSet;
  formData: any;
  handleRemoveImage: (url: string, i: number) => void;
};
const ImageOutput: FC<Props> = ({ colors, formData, handleRemoveImage }) => {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {formData.imageUrls.length > 0 &&
        formData.imageUrls.map((url: string, i: number) => (
          <Box key={i} py={1} display={"flex"} borderRadius={1}>
            <IconButton
              sx={{
                "&:hover": { bgcolor: "transparent" },
                height: "fit-content",
                color: colors.black[500],
              }}
              onClick={() => handleRemoveImage(url, i)}
            >
              <Cancel sx={{ fontSize: 14 }} />
            </IconButton>
            <Box
              component={"img"}
              src={url}
              alt="listing image"
              sx={{
                width: 50,
                height: 50,
                objectFit: "cover",
                borderRadius: 1,
              }}
              className="w-20 h-20 object-contain rounded-lg"
            />
          </Box>
        ))}
    </Box>
  );
};
export default ImageOutput;
