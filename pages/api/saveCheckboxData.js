import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { connectToDatabase } from '@/lib/mongodb';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === 'POST') {
    const { checkboxId, isChecked, category } = req.body;

    try {
      // Connect to MongoDB database
      const { db } = await connectToDatabase();
      const collection = db.collection('user_progress');

      // Insert the checkbox data into the MongoDB collection

      const result = await collection.updateOne(
        { 
          username: session.user.username, 
          category: category,
          checkbox_id: checkboxId 
        }, 
        { $set: { is_checked: isChecked } },
        { upsert: true } // if document doesn't exist, create it
      );

      if (result.matchedCount > 0) {
        console.log('Document updated');
      } else {
        console.log('Document inserted');
      }

      res.status(200).json({ message: 'Data saved successfully' });
    } 
    catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Failed to save data' });
    }
  } 
  else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}