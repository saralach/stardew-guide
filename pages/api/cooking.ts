import { connectToDatabase } from '../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('recipes');

    // Query the database
    const query = {recipe_type: "Cooking"};         //get only cooking recipes
    const projection = { _id: 0, recipe_type: 0 };  //exclude _id and recipe_type fields
  
    const cookingRecipes = await collection.find(query, {projection}).toArray();
  
    res.status(200).json(cookingRecipes);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }

}