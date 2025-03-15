import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  const { villagername } = req.query;

  try {
    //----- Connect to MongoDB database ---------------------------
    const { db } = await connectToDatabase();
    const collection = db.collection('villagers');

    //----- Query the database for basic villager info ------------
    /*const query = { name: villagername }; 
    const projection = { _id: 0 }; 
  
    const villager = await collection.findOne(query, {projection});*/
  

    //----- Query the database for villager info & prefs ----------  
    const villager = await collection.aggregate([
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