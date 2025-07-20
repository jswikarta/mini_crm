import { Item } from "../order.model";

export interface CreateOrderInput {
  total: number;
  items: Item[];
  customer_id: number;
}
