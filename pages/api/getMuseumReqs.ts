import { connectToDatabase } from '../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('items');

    // Query the database
    const artifactsQuery = { 
      category: "Artifact",
      reqd_for_museum: true
    };
    const mineralsQuery = { 
      category: "Mineral",
      reqd_for_museum: true
    };
    const projection = { _id: 0 };  //exclude _id field
  
    const artifacts = await collection.find(artifactsQuery, {projection}).toArray();
    const minerals = await collection.find(mineralsQuery, {projection}).toArray();


    /*const artifacts = await collection.aggregate([
      { 
        // Artifacts info from items collection
        $match: {
          category: "Artifact",
          reqd_for_museum: true
        } 
      },
      {
        $lookup: { 
          // Get gift_prefs for villager (gets stored as array)
          from: "user_progress",
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
          // Exclude unnecessary fields
          gift_type: 0,
          sell_price: 0,
          reqd_for_museum: 0,
          gift_prefs: { _id: 0, villager_name: 0 }  
        }
      }
    ]).toArray();*/

  
    res.status(200).json({ artifacts, minerals });
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }

}