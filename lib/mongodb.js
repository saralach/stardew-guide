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

// Using global to prevent creating multiple connections in development mode
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} 
else {
  // In production, just use the standard connection method
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(MONGODB_DB);
  return { client, db };
}



/*import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to prevent multiple MongoClient instances during hot reloading.
  if (global._mongoClientPromise) {
    clientPromise = global._mongoClientPromise;
  } 
  else {
    global._mongoClientPromise = client.connect();
    clientPromise = global._mongoClientPromise;
  }
} 
else {
  // In production, always create a new MongoClient.
  clientPromise = client.connect();
}

export default clientPromise;*/