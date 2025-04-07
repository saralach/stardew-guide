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
  let itemName = (Array.isArray(itemname) ? itemname[0] : itemname)?.replaceAll("_", " ");

  // Adjust name for DB lookup for pages where items may be referred to as something else
  if(itemName === "Egg")
    itemName = "Egg (white)";
  else if(itemName === "Large Egg")
    itemName = "Large Egg (white)"

  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('items');

    const query = { item_name: itemName }; 
    const projection = { _id: 0 }; 
  
    const item = await collection.findOne(query, {projection});
    
    if(item.sources) {
      const itemSources = item.sources.reduce((accumulator: any[], currSource: any) => {
        // Store currSource's category
        const currCategory = currSource.source_category;
  
        // Remove category from currSource object
        delete currSource.source_category;
  
        // Get group that matches the category (if it exists)
        const sourceGroup = accumulator.find((group) => group.source_category === currCategory);
  
        // If group exists for the specific category, add the element to the existing 
        // group's array; Otherwise, create a group for that category
        if(sourceGroup)
          sourceGroup.sources.push(currSource);
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
    }

    if(item.uses) {
      const itemUses = item.uses.reduce((accumulator: any[], currUse: any) => {
        // Store currUse's category
        const currCategory = currUse.use_category;
  
        // Remove category from currUse object
        delete currUse.use_category;
  
        // Get group that matches the category (if it exists)
        const useGroup = accumulator.find((group) => group.use_category === currCategory);
  
        // If group exists for the specific category, add the element to the existing 
        // group's array; Otherwise, create a group for that category
        if(useGroup)
          useGroup.uses.push(currUse);
        else {
          const newArray = [currUse];
          accumulator.push({
            use_category: currCategory,
            uses: newArray
          });
        }
  
        return accumulator;
      }, []);
      item.uses = itemUses;
    }

    
    
    res.status(200).json(item);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch document' });
    console.log(error);
  }
}