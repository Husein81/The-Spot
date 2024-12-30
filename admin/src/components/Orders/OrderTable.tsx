/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetOrders } from "../../app/api/orders";
import { Pagination } from "../../app/models/Pagination/pagination";
import DataTable from "../DataTable";

const OrderTable = () => {
  const [pageMode, setPageMode] = useState<Pagination>({
    page: 1,
    pageSize: 10,
    searchTerm: "",
  });
  const { data, isPending } = useGetOrders(pageMode);

  // Mock data for development
  const mockOrders = [
    {
      id: "1",
      user: "646fd9bf65c2315c7b17a5c8",
      items: [
        {
          name: "Smartphone",
          quantity: 2,
          image: "https://example.com/images/smartphone.jpg",
          price: "299.99",
          product: "646fd9bf65c2315c7b17a5a1",
        },
        {
          name: "Wireless Headphones",
          quantity: 1,
          image: "https://example.com/images/headphones.jpg",
          price: "99.99",
          product: "646fd9bf65c2315c7b17a5a2",
        },
      ],
      itemsPrice: 699.97,
      totalPrice: 719.97,
      shippingAddress: {
        address: "123 Main Street",
        city: "San Francisco",
        postalCode: "94103",
        country: "USA",
      },
      shippingPrice: 20.0,
      paymentMethod: "Credit Card",
      paymentStatus: true,
      orderStatus: true,
      deliveredAt: "2024-11-18T15:00:00Z",
      paidAt: "2024-11-17T14:30:00Z",
    },
    {
      id: "2",
      user: "646fd9bf65c2315c7b17a5c8",
      items: [
        {
          name: "Smartphone",
          quantity: 2,
          image: "https://example.com/images/smartphone.jpg",
          price: "299.99",
          product: "646fd9bf65c2315c7b17a5a1",
        },
        {
          name: "Wireless Headphones",
          quantity: 1,
          image: "https://example.com/images/headphones.jpg",
          price: "99.99",
          product: "646fd9bf65c2315c7b17a5a2",
        },
      ],
      itemsPrice: 699.97,
      totalPrice: 719.97,
      shippingAddress: {
        address: "123 Main Street",
        city: "San Francisco",
        postalCode: "94103",
        country: "USA",
      },
      shippingPrice: 20.0,
      paymentMethod: "Credit Card",
      paymentStatus: true,
      orderStatus: true,
      deliveredAt: "2024-11-18T15:00:00Z",
      paidAt: "2024-11-17T14:30:00Z",
    },
    {
      id: "3",
      user: "646fd9bf65c2315c7b17a5c8",
      items: [
        {
          name: "Smartphone",
          quantity: 2,
          image: "https://example.com/images/smartphone.jpg",
          price: "299.99",
          product: "646fd9bf65c2315c7b17a5a1",
        },
        {
          name: "Wireless Headphones",
          quantity: 1,
          image: "https://example.com/images/headphones.jpg",
          price: "99.99",
          product: "646fd9bf65c2315c7b17a5a2",
        },
      ],
      itemsPrice: 499.97,
      totalPrice: 719.97,
      shippingAddress: {
        address: "123 Main Street",
        city: "San Francisco",
        postalCode: "94103",
        country: "USA",
      },
      shippingPrice: 20.0,
      paymentMethod: "Credit Card",
      paymentStatus: true,
      orderStatus: true,
      deliveredAt: "2024-11-18T15:00:00Z",
      paidAt: "2024-11-17T14:30:00Z",
    },
    {
      id: "4",
      user: "646fd9bf65c2315c7b17a5c8",
      items: [
        {
          name: "Smartphone",
          quantity: 2,
          image: "https://example.com/images/smartphone.jpg",
          price: "299.99",
          product: "646fd9bf65c2315c7b17a5a1",
        },
        {
          name: "Wireless Headphones",
          quantity: 1,
          image: "https://example.com/images/headphones.jpg",
          price: "99.99",
          product: "646fd9bf65c2315c7b17a5a2",
        },
      ],
      itemsPrice: 599.97,
      totalPrice: 719.97,
      shippingAddress: {
        address: "123 Main Street",
        city: "San Francisco",
        postalCode: "94103",
        country: "USA",
      },
      shippingPrice: 20.0,
      paymentMethod: "Credit Card",
      paymentStatus: true,
      orderStatus: true,
      deliveredAt: "2024-11-18T15:00:00Z",
      paidAt: "2024-11-17T14:30:00Z",
    },
  ];
  type Column = {
    key: "user" | "itemsPrice" | "totalPrice";
    header: string;
  };
  const columns: Column[] = [
    { key: "user", header: "user" },
    { key: "itemsPrice", header: "Items Price" },
    { key: "totalPrice", header: "Total" },
  ];

  return (
    <DataTable
      columns={columns}
      data={mockOrders}
      defaultRowsPerPage={pageMode.pageSize}
    />
  );
};

export default OrderTable;
