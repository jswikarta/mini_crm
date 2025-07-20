import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { Item, Order, OrderCustomer } from "./order.model";
import { CreateOrderInput } from "./dto/create-order.input";

export class OrderController {
  constructor(private orderService: OrderService) {}

  async findAll(req: Request, res: Response): Promise<void> {
    const orderCustomer: OrderCustomer[] = await this.orderService.findAll();
    res.status(200).json({ status: 200, data: orderCustomer });
  }

  async findByCustomer(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.customer_id);
    const orderByCustomer: Order[] = await this.orderService.findByCustomer(id);
    res.status(200).json({ status: 200, data: orderByCustomer });
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { total, items, customer_id }: CreateOrderInput = req.body;
      let errors: string[] = [];
      let cleanItem: Item[] = [];

      if (!total) {
        errors.push("total cannot be null.");
      } else if (isNaN(Number(total))) {
        errors.push("total must be number.");
      }

      if (!items) {
        errors.push("items cannot be null.");
      } else if (!Array.isArray(items)) {
        errors.push("items must be array.");
      } else if (items.length === 0) {
        errors.push("items cannot be empty");
      } else {
        cleanItem = items.map((item: Item, index: number) => {
          if (!item.name) errors.push("items name cannot be null.");
          if (!item.qty) errors.push("items qty cannot be null.");
          else if (isNaN(Number(item.qty))) errors.push("items qty must be number.");

          return {
            name: item.name,
            qty: Number(item.qty),
          };
        });
      }

      if (!customer_id) {
        errors.push("customer_id cannot be null.");
      } else if (isNaN(Number(customer_id))) {
        errors.push("customer_id must be number.");
      }

      if (errors.length > 0) {
        res.status(400).json({ status: 400, message: "Validation error", errors });
        return;
      }

      const createOrderInput: CreateOrderInput = {
        total: total,
        items: cleanItem,
        customer_id: customer_id,
      };
      const order: Order = await this.orderService.create(createOrderInput);

      res.status(200).json({ status: 200, data: order });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: (error as Error).message,
      });
    }
  }
}
