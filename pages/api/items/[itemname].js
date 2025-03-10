import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  let { itemname } = req.query;

  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('items');

    // Replace underscores with spaces
    itemname = itemname.replace("_", " ");

    // Query the database
    const query = { item_name: itemname }; 
    const projection = { _id: 0 }; 
  
    const item = await collection.findOne(query, {projection});

    res.status(200).json(item);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch document' });
  }
}