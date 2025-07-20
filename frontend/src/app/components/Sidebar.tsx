import { BookUser, FilePenLine, Newspaper } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const pathLocation = useLocation();

  return (
    <>
      <aside className="fixed top-0 hidden h-screen w-58 bg-[#353b40] text-xs font-normal md:block">
        <div className="flex h-12 items-center justify-center border-b border-gray-300">
          <Link to={"/"} className="text-gray-300 hover:text-gray-100">
            Mini CRM
          </Link>
        </div>

        <div className="px-4 pt-8">
          <div className="flex items-center text-gray-300 uppercase">
            <div className="ml-1">Main Menu</div>
          </div>
          <ul className="space-y-1 pt-2">
            <li className="py-1">
              <Link
                to={"/customer"}
                className={`flex items-center pl-1 hover:text-gray-100 ${
                  pathLocation.pathname === "/customer"
                    ? `border-r-4 border-blue-500 text-gray-100`
                    : `text-gray-300`
                }`}
              >
                <BookUser className="h-4 w-4" />
                <span className="ml-1">Customers Data</span>
              </Link>
            </li>
            <li className="py-1">
              <Link
                to={"/order"}
                className={`flex items-center pl-1 hover:text-gray-100 ${
                  pathLocation.pathname === "/order"
                    ? `border-r-4 border-blue-500 text-gray-100`
                    : `text-gray-300`
                }`}
              >
                <FilePenLine className="h-4 w-4" />
                <span className="ml-1">New Order</span>
              </Link>
            </li>
            <li className="py-1">
              <Link
                to={"/order/report"}
                className={`flex items-center pl-1 hover:text-gray-100 ${
                  pathLocation.pathname === "/order/report"
                    ? `border-r-4 border-blue-500 text-gray-100`
                    : `text-gray-300`
                }`}
              >
                <Newspaper className="h-4 w-4" />
                <span className="ml-1">Report Order</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
