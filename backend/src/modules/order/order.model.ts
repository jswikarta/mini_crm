import { Customer } from "../customer/customer.model";

export interface Item {
  qty: number;
  name: string;
}

export interface Order {
  id: number;
  date: string;
  total: number;
  items: Item[];
  customer_id?: number;
}

export interface OrderCustomer extends Order {
  customer: Customer;
}
