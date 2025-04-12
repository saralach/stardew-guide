import { ItemCategory } from '@/types/itemInfoTypes';
import { connectToDatabase } from '../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponse } from '@/types/apiResponseTypes';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ItemCategory | ErrorResponse>
) {

  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('items');

    // Query the database
    /*const query = { };

    //exclude _id field
    const projection = { 
      _id: 0
    };  
  
    const items = await collection.find(query, {projection}).toArray();*/

    //const items = await collection.distinct("item_name")

    const items = await collection.aggregate([
      { // Get item names grouped by category
        $group: {
          _id: "$category",
          items: { $push: '$item_name'}
        },
      },
      { // Sort by _id (ascending)
        $sort: {
          _id: 1
        }
      }
    ]).toArray();
 
    res.status(200).json(items);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }

}