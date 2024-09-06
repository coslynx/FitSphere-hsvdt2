import { NextApiRequest, NextApiResponse } from "next";
import { session, Session } from "next-auth/react";
import { prisma } from "@/app/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | Session | { error: string }>
) {
  const session = await session({ req });

  if (req.method === "GET" && session) {
    res.status(200).json(session);
  } else if (req.method === "POST" && session) {
    try {
      await prisma.user.update({
        where: { email: session.user.email },
        data: {
          username: req.body.username,
          profilePicture: req.body.profilePicture,
        },
      });
      res.status(200).json(session);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  } else if (req.method === "DELETE" && session) {
    try {
      await prisma.user.delete({
        where: { email: session.user.email },
      });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}