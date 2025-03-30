import { sources } from 'next/dist/compiled/webpack/webpack';
import { connectToDatabase } from '@/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { query } = req.query;

  // If parameter from URL included a querystring beyond the item name, 
  // take only the item name, then replace all underscores with spaces
  const itemName = (Array.isArray(query) ? query[0] : query)?.replaceAll("_", " ");

  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('items');

    // Query the database
    const query = { item_name: itemName }; 
    const projection = { _id: 0 }; 
  
    const item = await collection.findOne(query, {projection});

    // Sort sources into arrays based on their source_category
    const sourcesGroupedByCategory = item.sources.reduce((accumulator: any[], currSource: any) => {
      // Remove any spaces from category name
      let sourceCategory = currSource.source_category.replace("_", "");
      
      // If the category does not already have an array, create it
      if(!accumulator[sourceCategory])
        accumulator[sourceCategory] = [];

      // Add source to the array
      accumulator[currSource.source_category].push(currSource);

      return accumulator;
    }, {});

    item.sources = sourcesGroupedByCategory;
    
    res.status(200).json(item);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch document' });
  }
}