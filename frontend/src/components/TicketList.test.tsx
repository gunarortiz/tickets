import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  getAllByRole,
  getByRole,
} from "@testing-library/react";
import TicketList from "./TicketList";
import * as api from "../api/api";

jest.mock("../api/api");

describe("TicketList component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading message when isLoading is true", async () => {
    // Arrange
    const isLoading = true;

    // Act
    render(<TicketList />);

    // Assert
    await waitFor(() => {
      const loadingMessage = screen.getByText("Loading...");

      expect(loadingMessage).toBeInTheDocument();
    });
  });

  test("renders ticket items when isLoading is false", async () => {
    // Arrange
    const isLoading = false;
    const tickets: api.Ticket[] = [
      {
        client: "Client 1",
        issue: "Issue 1",
        status: "open",
        deadline: new Date(),
      },
      {
        client: "Client 2",
        issue: "Issue 2",
        status: "open",
        deadline: new Date(),
      },
    ];

    jest.spyOn(api, "getTickets").mockResolvedValue(tickets);

    // Act
    const view = render(<TicketList />);
    await waitFor(() => {
      // Assert
      const ticketItems = view.getAllByTestId("ticket-item");
      expect(ticketItems).toHaveLength(tickets.length);
    });
  });

  test("calls fetchTickets and updates tickets when handleStatusChange is called", async () => {
    // Arrange
    const ticket: api.Ticket = {
      _id: "id_1",
      client: "Client 1",
      issue: "Issue 1",
      status: "open" as const,
      deadline: new Date(),
    };
    const updatedTicket = { ...ticket, status: "closed" as const };

    jest.spyOn(api, "updateTicket").mockResolvedValue(ticket);
    jest.spyOn(api, "getTickets").mockResolvedValue([updatedTicket]);

    const { getByRole } = render(<TicketList />);

    await waitFor(() => {
      // Encuentra el interruptor por su rol
      const switchButton = getByRole("checkbox");

      // Simula un clic en el interruptor
      fireEvent.click(switchButton);
    });
    // Act
    // fireEvent.click(screen.getByTestId("ticket-item-status-change-button"));
    await waitFor(() => {
      // Assert
      expect(api.updateTicket).toHaveBeenCalledWith(ticket);
      expect(api.getTickets).toHaveBeenCalled();
    });
  });

  test("calls createTicket and fetchTickets when handleGenerateClick is called", async () => {
    // Arrange
    const ticket: api.Ticket = {
      client: "Random Client",
      issue: "Random Issue",
      status: "open",
      deadline: new Date(),
    };

    jest.spyOn(api, "createTicket").mockResolvedValue(ticket);
    jest.spyOn(api, "getTickets").mockResolvedValue([ticket]);

    const view = render(<TicketList />);
    await waitFor(() => {
      fireEvent.click(view.getByTestId("generate-ticket-button"));
    });

    await waitFor(() => {
      expect(api.createTicket).toHaveBeenCalled();
      expect(api.getTickets).toHaveBeenCalled();
    });
  });
});
