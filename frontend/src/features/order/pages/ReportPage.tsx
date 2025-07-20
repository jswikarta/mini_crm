import { useEffect, useState } from "react";
import type { OrderCustomer } from "../intarfaces/Order";
import { GetOrders } from "../api";
import Table from "../components/Table";

export default function ReportPage() {
  const [orders, setOrders] = useState<OrderCustomer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const getOrders = await GetOrders();
        setOrders(getOrders.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <>
      {!loading && (
        <div className="flex flex-col font-normal">
          <div className="text-md text-gray-500">Report Order</div>

          <div className="mt-4 rounded-sm border border-gray-100 bg-white px-2 shadow-sm">
            <div className="my-4 text-xs">
              {!orders?.length || error ? "Failed to fetch" : <Table orders={orders} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
