/**
 * MODULE:  pages/api/villagers/index.ts
 * 
 * SUMMARY:
 *   This endpoint retrieves a string array of villager names.
 * 
 *   HTTP Method Available:  GET
 * 
 * DEPENDENCIES:
 *   - next: for TypeScript types for Next.js-specific API request and responses
 *   - lib/mongodb: for connecting to the database
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET')
    res.status(405).json({ error: 'Method Not Allowed' });

  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('villagers');

    // Include only name field
    const projection = {
      _id: 0,
      name: 1
    };

    // Query the MongoDB database
    const data = await collection.find({}, { projection }).toArray();

    const villagerNames = data.map((villagerData: { name: string }) => villagerData.name);

    res.status(200).json(villagerNames);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
}