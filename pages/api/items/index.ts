/**
 * MODULE:  pages/api/items/index.ts
 * 
 * SUMMARY:
 *   This endpoint retrieves a list of all item names in the form of an array of item categories, 
 *   each with a field "_id" corresponding to the category name and a string array "items"
 *   that contains the names of all items within the category.
 * 
 *   HTTP Method Available:  GET
 * 
 * DEPENDENCIES:
 *   - next: for TypeScript types for Next.js-specific API request and responses
 *   - lib/mongodb: for connecting to the database
 *   - types/apiResponses: TypeScript type for response data
 *   - types/items: TypeScript type for response data
 * 
 * USED BY:
 *   - pages/Items/index.tsx
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { ErrorResponse } from '@/types/apiResponses';
import { ItemCategory } from '@/types/items';


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