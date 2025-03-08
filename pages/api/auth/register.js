import { hash } from "bcryptjs";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    try {
      const { db } = await connectToDatabase();

      //Look for existing users with the requested username
      const existingUser = await db.collection("users").findOne({ username });
      if (existingUser)
        return res.status(400).json({ message: "User already exists" });

      //If user does not exist, create a new user
      const hashedPassword = await hash(password, 12);
      const user = await db.collection("users").insertOne({
        username: username,
        password: hashedPassword
      });
      
      return res.status(201).json({ message: "User registered successfully" });
    } 
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}



