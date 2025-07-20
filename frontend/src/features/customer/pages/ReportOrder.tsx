import { useEffect, useState } from "react";
import { GetOrderByCustomer } from "../api";
import TableOrder from "../components/TableOrder";
import type { Order } from "../../order/intarfaces/Order";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import { Undo2 } from "lucide-react";

export default function ReportOrder() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!id) throw new Error("Customer ID not found in URL");
        const getOrders = await GetOrderByCustomer(Number(id));
        setOrders(getOrders.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <>
      {!loading && (
        <div className="flex flex-col font-normal">
          <div className="text-md text-gray-500">Report Order</div>

          <div className="mt-4 rounded-sm border border-gray-100 bg-white px-2 shadow-sm">
            <div className="flex items-center border-b border-gray-300 py-2">
              <Button color="red" onClick={() => navigate(-1)}>
                <Undo2 className="h-4 w-4" /> Back
              </Button>
            </div>

            <div className="my-4 text-xs">
              {error ? "Failed to fetch" : <TableOrder orders={orders} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
