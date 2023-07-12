import axios from "axios";

export interface Ticket {
  _id?: string;
  client: string;
  issue: string;
  status: "open" | "closed";
  deadline: Date;
}

const API_BASE_URL = "http://localhost:3000";

export async function getTickets(): Promise<Ticket[]> {
  const response = await axios.get<Ticket[]>(`${API_BASE_URL}/tickets`);
  return response.data;
}

export async function createTicket(ticket: Ticket): Promise<Ticket> {
  const response = await axios.post<Ticket>(`${API_BASE_URL}/tickets`, ticket);
  console.log(response);
  return response.data;
}

export async function updateTicket(ticket: Ticket): Promise<Ticket> {
  const response = await axios.put<Ticket>(
    `${API_BASE_URL}/tickets/${ticket._id}`,
    ticket
  );
  return response.data;
}
