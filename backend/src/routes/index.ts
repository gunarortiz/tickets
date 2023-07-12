import { Router } from "express";
import { validateTicketData } from "../services/validationMiddleware";
import { TicketController } from "../controllers/ticketController";

const ticketController = new TicketController();
const router = Router();

router.get("/tickets", ticketController.getAllTickets);
router.post("/tickets", validateTicketData, ticketController.createTicket);
router.put("/tickets/:id", validateTicketData, ticketController.updateTicket);

export default router;
