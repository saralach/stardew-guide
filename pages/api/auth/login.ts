import { compare } from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ username });

    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const isValid = await compare(password, user.password);

    if (!isValid)
      return res.status(401).json({ message: "Invalid credentials" });

    // Handle Session logic here (JWT or session cookies)

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }

}
