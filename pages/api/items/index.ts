import { ItemCategory } from '@/types/itemInfoTypes';
import { connectToDatabase } from '@/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponse } from '@/types/apiResponseTypes';

// HTTP Method Available: GET
// This endpoint retrieves a list of all item names in the form of an array of item categories, 
// each with a field “_id” corresponding to the category name and a string array “items” 
// that contains the names of all items within the category.

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ItemCategory | ErrorResponse>
) {

  if (req.method !== 'GET')
    res.status(405).json({ error: 'Method Not Allowed' });

  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('items');

    const items = await collection.aggregate([
      { // Get item names grouped by category
        $group: {
          _id: "$category",
          items: { $push: '$item_name'}
        },
      },
      { // Sort by _id (ascending)
        $sort: { _id: 1 }
      }
    ]).toArray();
 
    res.status(200).json(items);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }

}