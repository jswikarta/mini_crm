import cors from "cors";
import express, { Application } from "express";
import CustomerRoute from "./modules/customer/customer.route";
import OrderRoute from "./modules/order/order.route";

const app: Application = express();
const port: number = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/customer", CustomerRoute);
app.use("/api/order", OrderRoute);

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});
