import { connectToDatabase } from '../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('tracker_reqs');

    // Query the database
    const perfectionReqs = await collection.aggregate([
      { 
        // ============= Get reqs from tracker_reqs collection ==============
        $match: { category: "Perfection" } 
      },
      { 
        // =========== Sort by subcategory_id in ascending order ============
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



  
    res.status(200).json(perfectionReqs);
  }
  catch (err) {
    res.status(500).json({ error: err });
  }

}