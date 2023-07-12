import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Ticket, createTicket, getTickets, updateTicket } from "../api/api";
import TicketItem from "./TicketItem";
import { Button, CircularProgress } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const logsRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    if (logsRef.current != null) {
      logsRef.current.scrollTop = logsRef!.current.scrollHeight + 80;
    }
  }, [isGenerating]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await getTickets();
      setTickets(response as []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleStatusChange = async (ticket: Ticket) => {
    try {
      await updateTicket(ticket);
      fetchTickets();
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  const getRandomName = () => {
    let name = ["Luca", "Rowan", "Amara", "Sas", "Finn"];
    let rand_name = Math.floor(Math.random() * name.length);
    return name[rand_name];
  };

  const handleGenerateClick = async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    try {
      const randomTicket: Ticket = {
        client: getRandomName(),
        issue: "Random Issue " + Math.floor(Math.random() * 400),
        status: "open",
        deadline: new Date(
          Date.now() -
            2 * 24 * 60 * 60 * 1000 +
            Math.random() * 4 * 24 * 60 * 60 * 1000
        ),
      };

      await createTicket(randomTicket);
      await fetchTickets();
    } catch (error) {
      console.error("Error generating ticket:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-100">
      {isLoading ? (
        <div>
          <CircularProgress />
          <p>Loading...</p>
        </div>
      ) : (
        <div className="h-fill">
          <ul ref={logsRef}>
            {tickets?.map((ticket: any, index: number) => (
              <TicketItem
                key={index}
                number={index + 1}
                ticket={ticket}
                onStatusChange={handleStatusChange}
              />
            ))}
          </ul>
          <footer>
            <Button
              endIcon={<ChevronRightIcon />}
              variant="contained"
              color="primary"
              onClick={handleGenerateClick}
              disabled={isGenerating}
              data-testid="generate-ticket-button"
              size="small"
            >
              {isGenerating ? "Generating..." : "Create Randomly"}
            </Button>
            <Button
              endIcon={<ChevronRightIcon />}
              variant="contained"
              color="primary"
              size="small"
            >
              Create new
            </Button>
          </footer>
        </div>
      )}
    </div>
  );
};

export default TicketList;
