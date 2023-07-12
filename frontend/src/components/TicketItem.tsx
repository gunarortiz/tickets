import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Switch,
  Box,
} from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { Ticket, updateTicket } from "../api/api";

interface TicketItemProps {
  number: number;
  ticket: Ticket;
  onStatusChange: (ticket: Ticket) => void;
}

const TicketItem: React.FC<TicketItemProps> = ({
  number,
  ticket,
  onStatusChange,
}) => {
  const handleSliderChange = async (
    event: React.ChangeEvent<{}>,
    ticket: Ticket
  ) => {
    const updatedTicket: Ticket = {
      ...ticket,
      status: ticket.status === "open" ? "closed" : "open",
    };

    onStatusChange(updatedTicket);
  };

  const getSliderValue = () => {
    return ticket.status === "closed" ? false : true;
  };

  const getSliderColor = () => {
    if (ticket.status === "closed") {
      return "#01c853";
    } else if (new Date() > new Date(ticket.deadline)) {
      return "#d74315";
    } else {
      return "#fec107";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toJSON().slice(0,10).split('-').reverse().join('/');
  }
const df = `${number}. ${ticket.client}`
  return (
    <Box className="item-list" data-testid="ticket-item">
      <ListItem>
      {number}.
        <ListItemText className="first-item" primary={`${ticket.client}`} />
        <ListItemText primary={formatDate(ticket.deadline)} />

        <ListItemSecondaryAction>
          <Switch
          aria-label={ticket._id}
            checked={getSliderValue()}
            onChange={(event) => handleSliderChange(event, ticket)}
          />
          <IconButton disabled>
            <RadioButtonCheckedIcon
              style={{ color: getSliderColor(), fontSize: "30px" }}
            />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Box className="issue-box">
        <span>{ticket.issue}</span>
      </Box>
    </Box>
  );
};

export default TicketItem;
