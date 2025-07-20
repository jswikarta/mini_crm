import { Plus } from "lucide-react";
import Button from "../../../components/Button";
import FormCustomer from "../components/FormCustomer";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { Order } from "../intarfaces/Order";
import FormOrder from "../components/FormOrder";
import { Toaster } from "react-hot-toast";

export default function OrderPage() {
  const [orderForm, setOrderForm] = useState<Order>(() => {
    const existData = localStorage.getItem("order");
    if (existData) {
      try {
        return JSON.parse(existData) as Order;
      } catch {
        return { id: 0, date: "", total: 0, items: [], customer_id: 0 };
      }
    }
    return { id: 0, date: "", total: 0, items: [], customer_id: 0 };
  });

  return (
    <>
      <div className="text-xs">
        <Toaster />
      </div>
      <div className="flex flex-col font-normal">
        <div className="text-md text-gray-500">New Order</div>

        <div className="flex flex-col gap-1 md:flex-row">
          <div className="mt-4 w-full rounded-sm border border-gray-100 bg-white px-2 shadow-sm md:w-172">
            <div className="my-2 border-b border-gray-200 text-sm text-gray-500">Order List</div>
            <FormOrder orderForm={orderForm} setOrderForm={setOrderForm} />
          </div>
          <div className="mt-4 w-full rounded-sm border border-gray-100 bg-white px-2 shadow-sm md:w-128">
            <div className="my-2 flex justify-between border-b border-gray-200 text-sm text-gray-500">
              Customer Data
              <Link to={"/customer/add"}>
                <Button color="green">
                  <Plus className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <FormCustomer setOrderForm={setOrderForm} />
          </div>
        </div>
      </div>
    </>
  );
}
