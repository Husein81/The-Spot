"use client";

import { ProductType } from "@repo/types";
import { Button, Icon } from "@repo/ui";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      const imgs = row.getValue("images") as unknown[];
      const src = imgs?.[0];

      if (!src || typeof src !== "string") return null;

      return <Image src={src} alt="Image" width={50} height={50} />;
    },
  },
  {
    accessorKey: "shortDescription",
    header: "Description",
  },

  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: () => {
      return (
        <div className="flex gap-2 items-center">
          <Button size={"icon-sm"}>
            <Icon name={"SquarePen"} />
          </Button>
          <Button variant="destructive" size={"icon-sm"}>
            <Icon name={"Trash2"} />
          </Button>
        </div>
      );
    },
  },
];
