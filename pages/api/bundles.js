import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {

  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('bundles');

    // Query the database
    const query  = {};
    const sortBy = { bundle_num: 1}; //sort by bundle num (ascending)
    const projection = { _id: 0 }; //exclude _id field

    const bundles = await collection.find(query, {projection})
                                    .sort(sortBy)
                                    .toArray();

    res.status(200).json(bundles);
  } 

  catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }




}