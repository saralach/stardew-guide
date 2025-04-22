import { FullVillagerData } from '@/types/villagerInfoTypes';
import { connectToDatabase } from '@/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

// HTTP Method Available: GET
// This endpoint retrieves data corresponding to a specific villager.

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