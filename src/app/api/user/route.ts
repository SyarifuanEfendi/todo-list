import { NextApiRequest, NextApiResponse } from "next";
import User from "@/sequelize/models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, email } = req.body;
    try {
      const user = await User.create({ username, email });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
