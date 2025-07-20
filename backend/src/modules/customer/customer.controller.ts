import validator from "validator";
import { Request, Response } from "express";
import { Customer } from "./customer.model";
import { CustomerService } from "./customer.service";
import { CreateCustomerInput } from "./dto/create-customer.input";

export class CustomerController {
  constructor(private customerService: CustomerService) {}

  async findAll(req: Request, res: Response): Promise<void> {
    const customers: Customer[] = await this.customerService.findAll();
    res.status(200).json({ status: 200, data: customers });
  }

  async findOne(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const customer: Customer = await this.customerService.findOne(id);
    res.status(200).json({ status: 200, data: customer });
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, phone } = req.body;
      let errors: string[] = [];

      if (!name) {
        errors.push("name cannot be null.");
      }

      if (!email) {
        errors.push("email cannot be null.");
      } else if (!validator.isEmail(email)) {
        errors.push("email not valid.");
      }

      if (!phone) {
        errors.push("phone cannot be null.");
      } else if (!validator.isMobilePhone(phone, "id-ID")) {
        errors.push("phone not valid");
      }

      if (errors.length > 0) {
        res.status(400).json({ status: 400, message: "Validation error", errors });
        return;
      }

      const createCustomerInput: CreateCustomerInput = { name: name, email: email, phone: phone };
      const customer: Customer = await this.customerService.create(createCustomerInput);

      res.status(200).json({ status: 200, data: customer });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: (error as Error).message,
      });
    }
  }
}
