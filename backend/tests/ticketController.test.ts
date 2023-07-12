import request from "supertest";
import mongoose from "mongoose";
import { Ticket } from "../src/models/ticket";
import { app } from "../src/server";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("TicketController", () => {
  beforeAll(async () => {
    // Connect to a test database before running tests
    const mongoServer = await MongoMemoryServer.create();

    // Connecting to the mongoDB memory server using mongoose
    await mongoose.connect(mongoServer.getUri(), { dbName: "test" });
  });

  afterAll(async () => {
    // Disconnect from the test database after running tests
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // Clear the database after each test
    await Ticket.deleteMany({});
  });

  describe("GET /tickets", () => {
    it("should retrieve a list of all tickets sorted by deadline in descending order", async () => {
      // Create some test tickets
      const tickets = [
        {
          client: "Client A",
          issue: "Issue A",
          status: "open",
          deadline: new Date("2023-07-10"),
        },
        {
          client: "Client B",
          issue: "Issue B",
          status: "closed",
          deadline: new Date("2023-07-05"),
        },
      ];
      await Ticket.insertMany(tickets);

      // Make the request to the endpoint
      const response = await request(app).get("/tickets");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].client).toBe("Client A");
      expect(response.body[1].client).toBe("Client B");
    });
  });

  describe("POST /tickets", () => {
    it("should create a new ticket", async () => {
      const ticketData = {
        client: "Client A",
        issue: "Issue A",
        status: "open",
        deadline: "2023-07-10",
      };

      // Make the request to the endpoint
      const response = await request(app).post("/tickets").send(ticketData);

      expect(response.status).toBe(201);
      expect(response.body.client).toBe(ticketData.client);
      expect(response.body.issue).toBe(ticketData.issue);
      expect(response.body.status).toBe(ticketData.status);
      expect(new Date(response.body.deadline)).toEqual(
        new Date(ticketData.deadline)
      );
    });

    it("should return a 400 Bad Request if required fields are missing", async () => {
      const invalidTicketData = {
        client: "Client A",
        status: "open",
        deadline: "2023-07-10",
      };

      // Make the request to the endpoint
      const response = await request(app)
        .post("/tickets")
        .send(invalidTicketData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("PUT /tickets/:id", () => {
    it("should update an existing ticket", async () => {
      const existingTicket = new Ticket({
        client: "Client A",
        issue: "Issue A",
        status: "open",
        deadline: new Date("2023-07-10"),
      });
      await existingTicket.save();

      const updatedTicketData = {
        client: "Updated Client A",
        issue: "Updated Issue A",
        status: "closed",
        deadline: "2023-07-15",
      };

      // Make the request to the endpoint
      const response = await request(app)
        .put(`/tickets/${existingTicket._id}`)
        .send(updatedTicketData);

      expect(response.status).toBe(200);
      expect(response.body.client).toBe(updatedTicketData.client);
      expect(response.body.issue).toBe(updatedTicketData.issue);
      expect(response.body.status).toBe(updatedTicketData.status);
      expect(new Date(response.body.deadline)).toEqual(
        new Date(updatedTicketData.deadline)
      );
    });

    it("should return a 400 Bad Request if required fields are missing", async () => {
      const existingTicket = new Ticket({
        client: "Client A",
        issue: "Issue A",
        status: "open",
        deadline: new Date("2023-07-10"),
      });
      await existingTicket.save();

      const invalidTicketData = {
        client: "Updated Client A",
        status: "closed",
        deadline: "2023-07-15",
      };

      // Make the request to the endpoint
      const response = await request(app)
        .put(`/tickets/${existingTicket._id}`)
        .send(invalidTicketData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return a 404 Not Found if the ticket does not exist", async () => {
      const updatedTicketData = {
        client: "Updated Client A",
        issue: "Updated Issue A",
        status: "closed",
        deadline: "2023-07-15",
      };

      // Make the request to the endpoint
      const response = await request(app)
        .put("/tickets/64a72936923a5f7e204e34d1")
        .send(updatedTicketData);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
    });
  });
});
