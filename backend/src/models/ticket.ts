import mongoose, { Schema, Document } from "mongoose";

export interface ITicket extends Document {
  client: string;
  issue: string;
  status: "open" | "closed";
  deadline: Date;
}

const TicketSchema: Schema = new Schema({
  client: { type: String, required: true },
  issue: { type: String, required: true },
  status: { type: String, enum: ["open", "closed"], required: true },
  deadline: { type: Date, required: true },
});

export const Ticket = mongoose.model<ITicket>("Ticket", TicketSchema);
