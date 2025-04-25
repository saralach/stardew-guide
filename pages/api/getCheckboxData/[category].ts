/**
 * MODULE:  pages/api/getCheckboxData/[category].ts
 * 
 * SUMMARY:
 *   Used for retrieving a user’s checkbox data for the specified category. 
 *   The categories correspond to the names of the trackers (Perfection, Museum, etc.).
 * 
 *   HTTP Method Available:  GET
 * 
 * DEPENDENCIES:
 *   - next: for TypeScript types for Next.js-specific API request and responses
 *   - next-auth/next: for retrieving session
 *   - pages/api/auth/[...nextauth]: necessary for retrieving session
 *   - lib/mongodb: for connecting to the database
 *   - types/apiResponses: for TypeScript type for response
 *   - types/userProgress: for TypeScript type for response
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { connectToDatabase } from '@/lib/mongodb';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { GeneralResponse } from '@/types/apiResponses';
import { CheckData } from '@/types/userProgress';


export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<CheckData[] | GeneralResponse>
) {

  const session = await getServerSession(req, res, authOptions);
  const { category } = req.query;

  if (req.method !== 'GET')
    res.status(405).json({ error: 'Method Not Allowed' });
  
  if (!session)
    return res.status(401).json({ message: "Unauthorized" });

  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('user_progress');

    // Get only signed in user's documents, & only of the specified category
    const query = {
      username: session.user.username,
      category: category
    }; 

    // Exclude _id, username, and category fields
    const projection = {
      _id: 0,
      username: 0,
      category: 0
    }; 

    // Query the database
    const userCheckboxData = await collection.find(query, {projection}).toArray();
    console.log(userCheckboxData);
  
    res.status(200).json(userCheckboxData);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }

}