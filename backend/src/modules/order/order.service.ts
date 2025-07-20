import fs from "fs";
import path from "path";
import fsData from "../../mock/db";
import { Customer } from "../customer/customer.model";
import { CreateOrderInput } from "./dto/create-order.input";
import { Item, Order, OrderCustomer } from "./order.model";

export class OrderService {
  private orders: Order[] = fsData.orders;
  private customers: Customer[] = fsData.customers;

  private writeDB(data: any) {
    const fsPath = path.join(__dirname, "../../mock/db.json");
    fs.writeFileSync(fsPath, JSON.stringify(data, null, 2), "utf8");
  }

  private newDate() {
    const date = new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0"); // bulan 0–11
    const d = String(date.getDate()).padStart(2, "0");

    return `${y}/${m}/${d}`;
  }

  async findAll(): Promise<OrderCustomer[]> {
    const orderCustomer: OrderCustomer[] = this.orders.map((order: Order) => {
      const customer: Customer = this.customers.filter(
        (customer: Customer) => customer.id === order.customer_id
      )[0];

      return {
        ...order,
        customer: customer,
      };
    });

    return orderCustomer;
  }

  async findByCustomer(id: number): Promise<Order[]> {
    const orderByCustomer: Order[] = this.orders.filter((order: Order) => order.customer_id === id);
    return orderByCustomer;
  }

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const existCustomer = this.customers.find(
      (customer: Customer) => customer.id === createOrderInput.customer_id
    );

    if (!existCustomer) {
      throw new Error("Customer not found");
    }

    const newOrder = {
      id: this.orders.length + 1,
      date: this.newDate(),
      ...createOrderInput,
    };

    fsData.orders.push(newOrder);
    this.writeDB(fsData);

    return newOrder;
  }
}
