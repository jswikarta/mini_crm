import type { Item, Order } from "../../order/intarfaces/Order";

interface TableOrderProps {
  orders: Order[];
}

export default function TableOrder({ orders }: TableOrderProps) {
  const thClass: string = "border border-gray-300 py-1 font-normal text-gray-600 hover:bg-gray-200";
  const tdClass: string = "border border-gray-300 p-1 px-4 text-gray-600";

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-fixed">
          <thead className="bg-gray-100">
            <tr className="text-center">
              <th className={`min-w-32 ${thClass}`}>Order Date</th>
              <th className={`min-w-32 ${thClass}`}>Order Total</th>
              <th className={`min-w-128 ${thClass}`}>Order Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order: Order) => (
                <tr key={order.id}>
                  <td className={tdClass}>{order.date}</td>
                  <td className={tdClass}>{order.total}</td>
                  <td className={tdClass}>
                    <ul>
                      {order.items.map((item: Item, index: number) => (
                        <li key={index}>
                          {item.qty} - {item.name}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="transition-colors duration-150 hover:bg-gray-50">
                <td colSpan={3} className={`text-center ${tdClass}`}>
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
