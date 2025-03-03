import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  // Query the MongoDB database
  const query = {recipe_type: "Cooking"};
  const projection = { _id: 0, recipe_type: 0 };

  const cookingRecipes = await db.collection('recipes').find(query, { projection }).toArray();

  res.status(200).json(cookingRecipes);

  /*console.log(JSON.stringify(cookingRecipes));

  return {
    props: {
        cookingRecipes: JSON.parse(JSON.stringify(cookingRecipes)), // Ensure we handle serialization of MongoDB documents
    },
    revalidate: 3600, // Optional: Revalidate every 60 seconds if you want to update the page content
  };*/
}