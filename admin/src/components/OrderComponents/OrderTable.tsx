import React from "react";
import { Order } from "../../app/models/Order"
import CustomTable from "../CustomTable"


interface Orders{
    orders: Order[];
}
interface ColumnCellTable {
    id:string;
    label: string;
}
const OrderTable: React.FC<Orders> = ({ orders }) => {
    const columns: ColumnCellTable[] = [
        {id: 'id', label: 'ID'},
        {id: 'name', label: 'Name'},
        {id:'items', label:'Items'},
        {id:'totalPrice', label: 'Total Price'},
        {id:'shippingAddress', label: 'Shipping Address'},
        {id:'paymentStatus', label: 'Payment Status'},
        {id:'orderStatus', label: 'Order Status'},
    ]
  return (
    <CustomTable columns={columns} rows={orders}/>
  )
}
export default OrderTable