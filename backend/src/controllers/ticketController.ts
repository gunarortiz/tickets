import { Request, Response } from "express";
import { Ticket, ITicket } from "../models/ticket";

export class TicketController {
  public async getAllTickets(req: Request, res: Response): Promise<void> {
    try {
      const tickets = await Ticket.find();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public async createTicket(req: Request, res: Response): Promise<void> {
    try {
      const { client, issue, status, deadline } = req.body;

      const newTicket: ITicket = new Ticket({
        client,
        issue,
        status,
        deadline,
      });

      const createdTicket = await newTicket.save();
      res.status(201).json(createdTicket);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  public async updateTicket(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { client, issue, status, deadline } = req.body;

      const updatedTicket = await Ticket.findByIdAndUpdate(
        id,
        { client, issue, status, deadline },
        { new: true }
      );

      if (!updatedTicket) {
        res.status(404).json({ error: "Ticket not found" });
        return;
      }

      res.json(updatedTicket);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
