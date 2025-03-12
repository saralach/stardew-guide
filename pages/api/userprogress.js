import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if(session) {
    res.send({
      content: "Please sign in to access this content." //update this
    });
  }
  else {
    res.send({
      error: "You must be signed in to view the content on this page."
    })
  }
}