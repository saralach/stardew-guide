import { Db, MongoClient, Collection } from 'mongodb';

// Mock .toArray() method
const mockToArray = jest.fn();

// Mock .find() method, with .toArray() method
const mockFind = jest.fn(() => ({ toArray: mockToArray }));

// Mock .findOne, insertOne, etc.
const mockFindOne = jest.fn();
const mockInsertOne = jest.fn();

// Mock .collection('collectionName'), with methods
const mockCollection = jest.fn(() => ({ 
  find: mockFind,
  findOne: mockFindOne,
  insertOne: mockInsertOne,
}));

// Mock .db('dbName'), with .collection() method
const mockDb = jest.fn(() => ({ collection: mockCollection }));

// Mock MongoDB Client
const mockClient = { db: mockDb };

// What API routes need to import
const clientPromise = Promise.resolve(mockClient);

// Export everything so can tweak in tests as needed
export default clientPromise;
export const __mockDb = {
  mockClient,
  mockDb,
  mockCollection,
  mockFindOne,
  mockInsertOne,
  mockFind,
  mockToArray,
};

export const overrideMockToArray = (data = []) => {
  __mockDb.mockToArray.mockResolvedValueOnce(data);
};