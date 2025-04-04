import { connectToDatabase } from '../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    //const collection = db.collection('items');
    const collection = db.collection('tracker_reqs');

    // Query the database
    const query = { category: "Museum" };
    const projection = { _id: 0, category: 0 };
    
    const museumReqs = await collection.find(query, { projection }).toArray();
    
    res.status(200).json( museumReqs );

    /*const artifactsQuery = { 
      category: "Artifact",
      reqd_for_museum: true
    };
    const mineralsQuery = { 
      category: "Mineral",
      reqd_for_museum: true
    };
    const projection = { _id: 0 };  //exclude _id field
  
    const artifacts = await collection.find(artifactsQuery, {projection}).toArray();
    const minerals = await collection.find(mineralsQuery, {projection}).toArray();
  
    res.status(200).json({ artifacts, minerals });*/
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }

}