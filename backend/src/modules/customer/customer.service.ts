import fs from "fs";
import fsData from "../../mock/db";
import { Customer } from "./customer.model";
import { CreateCustomerInput } from "./dto/create-customer.input";
import path from "path";

export class CustomerService {
  private customers: Customer[] = fsData.customers;

  private writeDB(data: any) {
    const fsPath = path.join(__dirname, "../../mock/db.json");
    fs.writeFileSync(fsPath, JSON.stringify(data, null, 2), "utf8");
  }

  async findAll(): Promise<Customer[]> {
    return this.customers;
  }

  async findOne(id: number): Promise<Customer> {
    const customer: Customer = this.customers.filter((i: Customer) => i.id === id)[0];
    return customer;
  }

  async create(createCustomerInput: CreateCustomerInput): Promise<Customer> {
    if (this.customers.find((i: Customer) => i.email === createCustomerInput.email)) {
      throw new Error("Email already used");
    }

    if (this.customers.find((i: Customer) => i.phone === createCustomerInput.phone)) {
      throw new Error("Phone already used");
    }

    const newCustomer = {
      id: this.customers.length + 1,
      ...createCustomerInput,
    };

    fsData.customers.push(newCustomer);
    this.writeDB(fsData);

    return newCustomer;
  }
}
