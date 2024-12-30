/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cancel } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { FC } from "react";

type Props = {
  formData: any;
  handleRemoveImage: (url: string, i: number) => void;
};
const ImageOutput: FC<Props> = ({ formData, handleRemoveImage }) => {
  return (
    <div className="flex gap-2">
      {formData.length > 0 &&
        formData.map((url: string, i: number) => (
          <div
            key={i}
            className="flex justify-between p-1 border border-gray-500 rounded-md"
          >
            <img
              src={url}
              alt="listing image"
              className="w-20 h-20 object-cover rounded-md"
            />
            <IconButton
              sx={{
                "&:hover": { bgcolor: "transparent" },
                height: "fit-content",
              }}
              onClick={() => handleRemoveImage(url, i)}
            >
              <Cancel />
            </IconButton>
          </div>
        ))}
    </div>
  );
};
export default ImageOutput;
