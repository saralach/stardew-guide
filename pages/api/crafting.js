import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {

  try {
    // Connect to MongoDB database
    const { db } = await connectToDatabase();
    const collection = db.collection('recipes');

    // Query the database
    const query = {recipe_type: "Crafting"}; //get only crafting recipes
    const projection = { _id: 0, recipe_type: 0 }; //exclude _id and recipe_type fields
  
    const craftingRecipes = await collection.find(query, {projection}).toArray();
  
    res.status(200).json(craftingRecipes);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }

}