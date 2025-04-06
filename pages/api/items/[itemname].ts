import { sources } from 'next/dist/compiled/webpack/webpack';
import { connectToDatabase } from '@/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { SourceCategory, SourceInfo } from '@/types/itemInfoTypes';
import { ErrorResponse } from '@/types/types';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<SourceCategory | ErrorResponse>
) {

  const { itemname } = req.query;

  // If parameter from URL included a querystring beyond the item name, take only
  // the item name, then replace all underscores with spaces for db lookup
  const itemName = (Array.isArray(itemname) ? itemname[0] : itemname)?.replaceAll("_", " ");

  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('items');

    const query = { item_name: itemName }; 
    const projection = { _id: 0 }; 
  
    const item = await collection.findOne(query, {projection});
  
    const itemSources = item.sources.reduce((accumulator: any[], currSource: any) => {
      // Store currSource's category
      const currCategory = currSource.source_category;
      console.log(currSource);

      // Remove category from currSource object
      delete currSource.source_category;
      console.log(currSource);

      // Get group that matches the category (if it exists)
      console.log(accumulator)
      console.log(Array.isArray(accumulator))
      const sourceGroup = accumulator.find((group) => group.source_category === currCategory);
      console.log("sourceGroup: ");
      console.log(sourceGroup);

      // If group exists for the specific category, add the element to the existing group's array
      if(sourceGroup) {
        sourceGroup.sources.push(currSource);
      }
      // If no group exists for that category yet, create that group
      else {
        const newArray = [currSource];
        accumulator.push({
          source_category: currCategory,
          sources: newArray
        });
      }

      return accumulator;
    }, []);

    item.sources = itemSources;

    // Query the database
    /*const item: SourceCategory[] = await collection.aggregate([
      { // Get specific item info
        $match: { item_name: itemName }
      },
      {
        $unwind: "$sources"
      },
      { // Group sources by source categories & keep other 
        $group: {
          _id: {
            source_category: "$sources.source_category",
            item_name: itemName
          },
          sources: { $push: "$sources" }
        }
      },
      {
        $project: {
          _id: 0,
          item_name: 1,
          sources: 1
        }
      }
    ]).toArray();*/
    
    /*const query = { item_name: itemName }; 
    const projection = { _id: 0 }; 
  
    const item = await collection.findOne(query, {projection});

    console.log(item);

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

    item.sources = sourcesGroupedByCategory;*/

    
    
    res.status(200).json(item);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch document' });
    console.log(error);
  }
}