import { BookUser, FilePenLine, Newspaper } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const pathLocation = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#353b40] text-xs font-normal shadow-md md:hidden">
      <div className="flex h-12 items-center justify-between px-4">
        {/* Brand */}
        <Link to="/" className="text-gray-300 hover:text-gray-100">
          Mini CRM
        </Link>

        {/* Menu */}
        <ul className="flex items-center gap-6">
          <li>
            <Link
              to="/customer"
              className={`flex items-center gap-1 hover:text-gray-100 ${
                pathLocation.pathname === "/customer"
                  ? "border-b-2 border-blue-500 text-gray-100"
                  : "text-gray-300"
              }`}
            >
              <BookUser className="h-4 w-4" />
              Customers Data
            </Link>
          </li>
          <li>
            <Link
              to="/order"
              className={`flex items-center gap-1 hover:text-gray-100 ${
                pathLocation.pathname === "/order"
                  ? "border-b-2 border-blue-500 text-gray-100"
                  : "text-gray-300"
              }`}
            >
              <FilePenLine className="h-4 w-4" />
              New Order
            </Link>
          </li>
          <li>
            <Link
              to="/order/report"
              className={`flex items-center gap-1 hover:text-gray-100 ${
                pathLocation.pathname === "/order/report"
                  ? "border-b-2 border-blue-500 text-gray-100"
                  : "text-gray-300"
              }`}
            >
              <Newspaper className="h-4 w-4" />
              Report Order
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
