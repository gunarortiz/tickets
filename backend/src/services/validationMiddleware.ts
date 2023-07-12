import { Request, Response, NextFunction } from "express";

export const validateTicketData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { client, issue, status, deadline } = req.body;

  if (!client || !issue || !status || !deadline) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  if (status !== "open" && status !== "closed") {
    res.status(400).json({ error: "Invalid status value" });
    return;
  }

  next();
};
