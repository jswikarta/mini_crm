import type { RouteObject } from "react-router-dom";
import OrderPage from "./pages/OrderPage";
import ReportPage from "./pages/ReportPage";

export const orderRoutes: RouteObject[] = [
  {
    path: "/order",
    element: <OrderPage />,
  },
  {
    path: "/order/report",
    element: <ReportPage />,
  },
];
