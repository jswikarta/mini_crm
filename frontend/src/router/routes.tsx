import type { RouteObject } from "react-router-dom";
import App from "../app/App";
import Dashboard from "../features/dashboard/Dashboard";
import { customerRoutes } from "../features/customer/routes";
import { orderRoutes } from "../features/order/routes";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      ...customerRoutes,
      ...orderRoutes,
    ],
  },
];
