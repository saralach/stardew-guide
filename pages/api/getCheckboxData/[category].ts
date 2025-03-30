import { connectToDatabase } from '@/lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { CheckData } from '@/types/userProgress';

export default async function handler(req: NextApiRequest, res: NextApiResponse<CheckData>) {
  const session = await getServerSession(req, res, authOptions);
  const { category } = req.query;
  
  if (!session)
    return res.status(401).json({ message: "Unauthorized" });

  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('user_progress');

    // Get only signed in user's documents, & only of the specified category
    const query = {
      username: session.user.username,
      category: category
    }; 

    // Exclude _id, username, and category fields
    const projection = {
      _id: 0,
      username: 0,
      category: 0
    }; 

    // Query the database
    const userCheckboxData = await collection.find(query, {projection}).toArray();
    console.log(userCheckboxData);
  
    res.status(200).json(userCheckboxData);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }


  /*try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('user_checkbox_data');

    // Query the database
    const query = { 
      username: session.user.username, 
      category: category
    }; // Get only signed in user's documents, & only of the specified category
    const projection = { 
      _id: 0, 
      username: 0, 
      category: 0
    }; // Exclude _id, username, and category fields

    const userCheckboxData = await collection.find(query, {projection}).toArray();
    console.log(userCheckboxData);

    res.status(200).json(userCheckboxData);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }*/

}