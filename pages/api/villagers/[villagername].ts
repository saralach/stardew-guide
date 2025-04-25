/**
 * MODULE:  pages/api/villagers/[villagername].ts
 * 
 * SUMMARY:
 *   This endpoint retrieves data corresponding to a specific villager.
 * 
 *   HTTP Method Available:  GET
 * 
 * DEPENDENCIES:
 *   - next: for TypeScript types for Next.js-specific API request and responses
 *   - lib/mongodb: for connecting to the database
 *   - types/villagers: TypeScript type for retrieved data
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { FullVillagerData } from '@/types/villagers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { villagername } = req.query;

  if (req.method !== 'GET')
    res.status(405).json({ error: 'Method Not Allowed' });

  try {
    //----- Connect to MongoDB database ---------------------------
    const { db } = await connectToDatabase();
    const collection = db.collection('villagers');

    //------ Query the database for all villager info -------------
    const villager: FullVillagerData[] = await collection.aggregate([
      { 
        // Get villager info from villagers collection
        $match: { name: villagername } 
      },
      {
        $lookup: { 
          // Get gift_prefs for villager (gets stored as array)
          from: "gift_prefs",
          localField: "name",
          foreignField: "villager_name",
          as: "gift_prefs"
        }
      },
      {
        $unwind: {  
          // Deconstruct the gift_prefs array
          path: '$gift_prefs',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 0,
          // Exclude _id & villager_name fields from the gift_prefs documents
          gift_prefs: { _id: 0, villager_name: 0 }  
        }
      }
    ]).toArray();

    res.status(200).json(villager[0]);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch document' });
  }
}