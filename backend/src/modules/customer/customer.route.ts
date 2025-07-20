import { Request, Response, Router } from "express";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";

const router = Router();
const service = new CustomerService();
const controller = new CustomerController(service);

router.get("/", (req, res) => controller.findAll(req, res));
router.get("/:id", (req, res) => controller.findOne(req, res));
router.post("/", (req, res) => controller.create(req, res));

export default router;
