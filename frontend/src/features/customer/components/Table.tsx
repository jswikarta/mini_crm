import { Link } from "react-router-dom";
import type { Customer } from "../interfaces/customer";

interface TableProps {
  customers: Customer[];
}

export default function Table({ customers }: TableProps) {
  const thClass: string = "border border-gray-300 py-1 font-normal text-gray-600 hover:bg-gray-200";
  const tdClass: string = "border border-gray-300 p-1 px-4 text-gray-600";

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-fixed">
          <thead className="bg-gray-100">
            <tr className="text-center">
              <th className={`min-w-128 ${thClass}`}>Customer Name</th>
              <th className={`min-w-64 ${thClass}`}>Customer E-mail</th>
              <th className={`min-w-64 ${thClass}`}>Customer Phone</th>
              <th className={`min-w-64 ${thClass}`}>Report Order</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer: Customer) => (
                <tr key={customer.id}>
                  <td className={tdClass}>{customer.name}</td>
                  <td className={tdClass}>{customer.email}</td>
                  <td className={tdClass}>{customer.phone}</td>
                  <td className={tdClass}>
                    <Link to={`/customer/${customer.id}`} className="hover:text-blue-500">
                      Detail Order
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="transition-colors duration-150 hover:bg-gray-50">
                <td colSpan={3} className={`text-center ${tdClass}`}>
                  No Customers Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
