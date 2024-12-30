import { Upload } from "@mui/icons-material";
import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import IconButton from "./theSpotComponents/IconButton";

interface Props {
  setImages: (images: FileList | null) => void;
  handleImageSubmit: () => void;
  loadingUpload: boolean;
}
const ImageInput: FC<Props> = ({
  setImages,
  handleImageSubmit,
  loadingUpload,
}) => {
  return (
    <div className="flex flex-col gap-4 py-2">
      <IconButton label="" className="flex cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setImages(e.target.files)
          }
          multiple
        />
        <Upload />
      </IconButton>
      <Button className="" disabled={loadingUpload} onClick={handleImageSubmit}>
        {loadingUpload ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
};
export default ImageInput;
