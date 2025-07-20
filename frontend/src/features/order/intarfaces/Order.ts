import type { Customer } from "../../customer/interfaces/customer";

export interface Order {
  id: number;
  date: string;
  total: number;
  items: Item[];
  customer_id: number;
}

export interface Item {
  id: number;
  name: string;
  qty: number;
}

export interface OrderCustomer extends Order {
  customer: Customer;
}
