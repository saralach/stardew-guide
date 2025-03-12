import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {

  if (req.method === 'POST') {
    const {username, checkboxId, isChecked } = req.body;

    try {
      const { db } = await connectToDatabase();
      const collection = db.collection('user_progress');

      // Insert the checkbox data into the MongoDB collection
      const result = await collection.updateOne(
        { 
          username: username, 
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

      /*
      const result = await collection.updateOne(
        { _id: userId }, // Find the document by its _id
        {
          $push: {
            tasks: newTask // Add the new task to the tasks array
          }
        }
      );*/

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