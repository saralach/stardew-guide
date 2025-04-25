/**
 * MODULE:  pages/api/getTrackerReqs/[category].ts
 * 
 * SUMMARY:
 *   This endpoint is used for retrieving the tracker requirements for the specified category. 
 *   The categories correspond to the names of the trackers (Perfection, Museum, etc.).
 * 
 *   HTTP Method Available:  GET
 * 
 * DEPENDENCIES:
 *   - next: for TypeScript types for Next.js-specific API request and responses
 *   - lib/mongodb: for connecting to the database
 * 
 * USED BY:
 *   - tracker pages
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  let trackerReqs;
  const { category } = req.query;

  if (req.method !== 'GET')
    res.status(405).json({ error: 'Method Not Allowed' });

  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('tracker_reqs');

    // Query the database
    if(category === "Perfection") {
      trackerReqs = await collection.aggregate([
        { // ============= Get reqs from tracker_reqs collection ==============
          $match: { category: "Perfection" } 
        },
        { // =========== Sort by subcategory_id in ascending order ============
          $sort: { subcategory_id: 1 }
        },
        { // ============ Get recipe data from recipes collection =============
          $lookup: { 
            from: "recipes",
            localField: "subcategory",
            foreignField: "recipe_type",
            as: "recipe_reqs"
          }
        },
        { // =================== Rename recipe_reqs fields ====================
          $set: {
            recipe_reqs: {
              $map: { //for each element in the array ...
                input: "$recipe_reqs",
                as: "req",
                in: {
                  req_id: "$$req.item_produced",   //rename "item_produced" to "req_id"
                  items_reqd: "$$req.ingredients", //rename "ingredients" to "items_reqd"
                  qty: "$$req.qty_produced",       //rename "qty_produced" to "qty"
                }
              }
            }
          }
        },
        { // ============= Update reqs only if recipe_reqs exists =============
          $set: {
            reqs: {
              $cond: {
                if: { $gt: [{ $size: "$recipe_reqs" }, 0] }, // Check if recipe_reqs exists
                then: "$recipe_reqs",    // Set reqs to recipe_reqs if it exists
                else: {   // Keep reqs if recipe_reqs doesn't exist; sort by id_num (ascending)
                  $sortArray: {
                    input: "$reqs",
                    sortBy: { id_num: 1 }
                  }
                }
              }
            }
          }
        },
        { // =================== Exclude unnecessary fields ===================
          $project: {
            _id: 0,
            category: 0,
            recipe_reqs: 0
          }
        }
      ]).toArray();
    }
    else {
      const query = { category: category };
      const projection = { _id: 0, category: 0 };
      
      trackerReqs = await collection.find(query, { projection }).toArray();
    }
    console.log(trackerReqs);
    res.status(200).json( trackerReqs );
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }

}