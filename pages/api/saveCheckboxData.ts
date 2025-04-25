/**
 * MODULE:  pages/api/saveCheckboxData.ts
 * 
 * SUMMARY:
 *   This endpoint is used for updating the completion status of a single requirement. 
 *   Data will be saved to the database only if the user is logged in.
 * 
 *   HTTP Method Available:  POST
 * 
 * DEPENDENCIES:
 *   - next: for TypeScript types for Next.js-specific API request and responses
 *   - next-auth/next: for retrieving session
 *   - lib/mongodb: for connecting to the database
 *   - pages/api/auth/[...nextauth]: necessary for retrieving session
 *   - types/apiResponses: TypeScript type for response data
 * 
 * USED BY:
 *   - lib/handleChkChange.ts
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { connectToDatabase } from '@/lib/mongodb';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { GeneralResponse } from '@/types/apiResponses';


export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<GeneralResponse>
) {
  const session = await getServerSession(req, res, authOptions);
  const { checkboxId, isChecked, category, subcategory } = req.body;

  // Check if POST request
  if (req.method !== 'POST')
    res.status(405).json({ error: 'Method Not Allowed' });

  // Confirm user is logged in
  if (!session)
    res.status(401).json({ message: "Unauthorized" });
  else {
    try {
      // Connect to MongoDB database
      const { db } = await connectToDatabase();
      const collection = db.collection('user_progress');
      
      // Set up data for db operations
      const checkboxData = subcategory ? {
        username: session.user.username, 
        category: category,
        subcategory: subcategory,
        checkbox_id: checkboxId
      } : {
        username: session.user.username, 
        category: category,
        checkbox_id: checkboxId
      };

      // If checked, add new document to the collection; otherwise, remove any matching 
      // document(s) from the database
      let result;
      if(isChecked) 
        result = await collection.insertOne(checkboxData);
      else
        collection.deleteMany(checkboxData);
  
      res.status(200).json({ message: 'Data saved successfully' });
    } 
    catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Failed to save data' });
    }
  }

}