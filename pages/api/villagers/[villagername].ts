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
 * 
 * USED BY:
 *   - pages/Villagers/[villagername].tsx
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { FullVillagerData, GiftPrefGroup } from '@/types/villagers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { villagername } = req.query;

  if (req.method !== 'GET')
    res.status(405).json({ error: 'Method Not Allowed' });

  try {
    //----- Connect to MongoDB database ---------------------------
    const { db } = await connectToDatabase();
    const collection = db.collection('villagers');

    //------ Query the database for all villager info -------------
    const data: FullVillagerData[] = await collection.aggregate([
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

    const villager = data[0];

    function getPrefCategory(prefNum: number): string {
      switch(prefNum) {
        case 5:
          return 'Loved';
        case 4:
          return 'Liked';
        case 3:
          return 'Neutral';
        case 2:
          return 'Disliked';
        default:
          return 'Hated';
      };
    }

    // Group item preferences based on pref_num
    const prefs = villager?.gift_prefs?.items.reduce((accumulator: GiftPrefGroup[], item: any) => {
      // Store current item's pref
      const currPrefCategory = getPrefCategory(item.pref_num);

      // Get group that matches the category (if it exists)
      const prefGroup = accumulator.find((group) => group.pref === currPrefCategory);

      // If group exists for the specific category, add the element to the existing 
      // group's array; Otherwise, create a group for that category
      if(prefGroup)
        prefGroup.items.push(item.item_name);
      else {
        const newArray = [item.item_name];
        accumulator.push({
          pref: currPrefCategory,
          items: newArray
        });
      }

      return accumulator;
    }, []);

    if(prefs && prefs.length > 0)
      villager.gift_groups = prefs;

    res.status(200).json(villager);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch document' });
  }
}