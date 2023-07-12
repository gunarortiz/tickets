import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TicketList from "./components/TicketList";
import { Paper, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";

function App() {
  return (
    <Paper variant="outlined">
      <header>
        <div className="icon-container">
          <EventRepeatOutlinedIcon sx={{color: "#1D476F"}} />
        </div>
        Timeline
      </header>
      <TicketList />
    </Paper>
  );
}

export default App;
