/**
 * MODULE:  lib/mongodb
 * 
 * SUMMARY:
 *   Provides a reusable function to establish a connection to the MongoDB database.
 * 
 * DEPENDENCIES:
 *   - mongodb (MongoDB's Node.js driver)
 * 
 * USED BY:
 *   API routes - pages/api/
 */

import { MongoClient } from 'mongodb';

// MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

let client;
let clientPromise;


if (process.env.NODE_ENV === 'development') {
  // Using global to prevent creating multiple connections in dev mode
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} 
else {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(MONGODB_DB);
  return { client, db };
}