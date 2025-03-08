import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {

  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('villagers');

    // Query the MongoDB database
    const query = {};                 //get all villagers
    const projection = { _id: 0 };    //exclude _id field

    const villagers = await collection.find(query, {projection}).toArray();

    res.status(200).json(villagers);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }

}