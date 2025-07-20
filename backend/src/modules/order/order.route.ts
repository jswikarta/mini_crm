import { Request, Response, Router } from "express";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";

const router = Router();
const service = new OrderService();
const controller = new OrderController(service);

router.get("/", (req, res) => controller.findAll(req, res));
router.post("/", (req, res) => controller.create(req, res));
router.get("/:customer_id", (req, res) => controller.findByCustomer(req, res));

export default router;
