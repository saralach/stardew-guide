/**
 * MODULE:  pages/api/auth/register.ts
 * 
 * SUMMARY:
 *   Handles creation of an account. Confirms that credentials exist and that an account with
 *   the given username does not exist, before adding new account data to the database.
 * 
 *   HTTP Method Available:  POST
 * 
 * DEPENDENCIES:
 *   - bcryptjs: for generating password hashes
 *   - next: for TypeScript types for Next.js-specific API request and responses
 *   - lib/mongodb: for connecting to the database
 * 
 * USED BY:
 *   - pages/Login.tsx
 */

import { hash } from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' });
  
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Username and password are required' })

  try {
    const { db } = await connectToDatabase();

    //Look for existing users with the requested username
    const existingUser = await db.collection('users').findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: 'A user with that username already exists' });

    //If user does not exist, create a new user
    const hashedPassword = await hash(password, 12);
    const user = await db.collection('users').insertOne({
      username: username,
      password: hashedPassword
    });
    
    return res.status(201).json({ message: 'User registered successfully' });
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong!' });
  }
}



