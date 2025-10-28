import { auth } from "@clerk/nextjs/server";
import { OrderType } from "@repo/types";

const fetchOrders = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: OrderType[] = await res.json();
  return data;
};

export default async function OrdersPage() {
  const orders = await fetchOrders();

  if (!orders) {
    return <div>No orders found!</div>;
  }

  return (
    <div>
      <h1 className="text-2xl my-4 font-medium">Your Orders</h1>
      <ul className="">
        {orders.map((order) => (
          <li key={order._id} className="flex items-center mb-4">
            <div className="w-1/4">
              <span className="font-medium text-sm text-gray-500">
                Order ID
              </span>
              <p>{order._id}</p>
            </div>
            <div className="w-1/12">
              <span className="font-medium text-sm text-gray-500">Total</span>
              <p>{order.amount / 100}</p>
            </div>
            <div className="w-1/12">
              <span className="font-medium text-sm text-gray-500">Status</span>
              <p>{order.status}</p>
            </div>
            <div className="w-1/8">
              <span className="font-medium text-sm text-gray-500">Date</span>
              <p>
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-US")
                  : "-"}
              </p>
            </div>
            <div className="">
              <span className="font-medium text-sm text-gray-500">
                Products
              </span>
              <p>
                {order.products?.map((product) => product.name).join(", ") ||
                  "-"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
