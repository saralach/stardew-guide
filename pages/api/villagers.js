import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  // Query the MongoDB database
  const query = {};
  const projection = { _id: 0 };

  const villagers = await db.collection('villagers').find(query, { projection }).toArray();

  res.status(200).json(villagers);

  /*
  return {
    props: {
        villagers: JSON.parse(JSON.stringify(villagers)), // Ensure we handle serialization of MongoDB documents
    },
    revalidate: 3600, // Optional: Revalidate every 60 seconds if you want to update the page content
  };*/
}