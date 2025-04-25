/**
 * MODULE:  pages/api/items/[itemname].ts
 * 
 * SUMMARY:
 *   This endpoint retrieves information about a specific item.
 *   Item names are case-insensitive and will have any underscores replaced with spaces. 
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
 *   - pages/Items/[itemname].tsx
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { ErrorResponse } from '@/types/apiResponses';
import { SourceCategory } from '@/types/items';


export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<SourceCategory | ErrorResponse>
) {

  const { itemname } = req.query;

  if (req.method !== 'GET')
    res.status(405).json({ error: 'Method Not Allowed' });

  // If parameter from URL included a querystring beyond the item name, take only
  // the item name, then replace all underscores with spaces for db lookup
  let itemName = (Array.isArray(itemname) ? itemname[0] : itemname)?.replaceAll("_", " ");

  // Adjust name for DB lookup for pages where items may be referred to as something else
  if(itemName === "Egg" || itemName === "Large Egg")
    itemName += " (white)";

  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('items');

    // ----------- Query the database ------------------------------------
    const item = await collection.findOne(
      { item_name: itemName }, 
      {
        collation: { locale: "en", strength: 1 },   // Makes query case & accent insensitive
        projection: { _id: 0 }                      // Excludes _id field
      }
    );

    // ----------- Group source data into categories ---------------------
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
      
      if(Array.isArray(itemSources) && itemSources.length !== 0)
        item.sources = itemSources;
    }

    // ----------- Group use data into categories ------------------------
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
      
      if(Array.isArray(itemUses) && itemUses.length !== 0)
        item.uses = itemUses;
    }
    
    res.status(200).json(item);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch document' });
    console.log(error);
  }
}