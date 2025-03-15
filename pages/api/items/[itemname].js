import { sources } from 'next/dist/compiled/webpack/webpack';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  let { itemname } = req.query;

  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('items');

    // Replace underscores with spaces
    itemname = itemname.replace("_", " ");

    // Query the database
    const query = { item_name: itemname }; 
    const projection = { _id: 0 }; 
  
    const item = await collection.findOne(query, {projection});

    // Sort sources into arrays based on their source_category
    const sourcesGroupedByCategory = item.sources.reduce((result, source) => {
      // Remove any spaces from category name
      let sourceCategory = source.source_category.replace("_", "");
      
      // If the category does not already have an array, create it
      if(!result[sourceCategory]) {
        result[sourceCategory] = [];
      }

      // Add source to the array
      result[source.source_category].push(source);

      return result;
    }, {});

    item.sources = sourcesGroupedByCategory;
    

    res.status(200).json(item);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch document' });
  }
}