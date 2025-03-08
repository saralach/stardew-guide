import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  //const { villagername } = router.query;
  const { villagername } = req.query;

  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('villagers');

    // Query the database
    const query = { name: villagername }; 
    const projection = { _id: 0 }; 
  
    const villager = await collection.findOne(query, {projection});

    res.status(200).json(villager);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
}