import type { RouteObject } from "react-router-dom";
import ListPage from "./pages/ListPage";
import AddPage from "./pages/AddPage";
import ReportOrder from "./pages/ReportOrder";

export const customerRoutes: RouteObject[] = [
  {
    path: "/customer",
    element: <ListPage />,
  },
  {
    path: "/customer/add",
    element: <AddPage />,
  },
  {
    path: "/customer/:id",
    element: <ReportOrder />,
  },
];
