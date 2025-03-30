import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { connectToDatabase } from '@/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // Confirm user is logged in
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  // Check if POST request
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  else {
    const { checkboxId, isChecked, category, subcategory } = req.body;
    try {
      // Connect to MongoDB database
      const { db } = await connectToDatabase();
      const collection = db.collection('user_progress');

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

      let result;
      if(isChecked) {
        // Add new document to the database
        result = await collection.insertOne(checkboxData);
      }
      else
        collection.deleteMany(checkboxData);

      /*
      // Insert the checkbox data into the MongoDB collection
      const result = await collection.updateOne(
        { 
          username: session.user.username, 
          category: category,
          subcategory: subcategory,
          checkbox_id: checkboxId 
        }, 
        //{ $set: { is_checked: isChecked } },
        { upsert: true } // if document doesn't exist, create it
      );
      if (result.matchedCount > 0)
        console.log('Document updated');
      else
        console.log('Document inserted');
      */

      res.status(200).json({ message: 'Data saved successfully' });
    } 
    catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Failed to save data' });
    }
  } 

}