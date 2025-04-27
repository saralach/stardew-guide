/**
 * MODULE:  __tests__/api/auth/register.test.tsx
 * 
 * SUMMARY:
 *   Test suites for testing the registration API route.
 *   Tests that tabs and subtabs are displayed as intended and are/aren't links when necessary.
 * 
 * DEPENDENCIES:
 *   - node-mocks-http: for api route testing
 *   - lib/mongodb: for mocking database connection
 *   - pages/api/auth/register: API route to test
 */

import { createMocks } from 'node-mocks-http';
import { connectToDatabase } from '@/lib/mongodb';
import handler from '@/pages/api/auth/register';

jest.mock('../../../lib/mongodb', () => ({
  connectToDatabase: jest.fn()
}));

const mockDb = {
  collection: jest.fn()
};

const mockClient = {
  close: jest.fn()
}

const usersCollection = {
  findOne: jest.fn(),
  insertOne: jest.fn()
};

describe('Register API Route -- /api/auth/register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (connectToDatabase as jest.Mock).mockResolvedValue({ db: mockDb });
    mockDb.collection.mockReturnValue(usersCollection);
  });

  afterAll(async () => {
    mockClient.close();
  });

  it('returns 400 if username and password are missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {},
    });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData()).message).toBe('Username and password are required')
  });

  it('returns 400 if only username is given', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { username: 'test123' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData()).message).toBe('Username and password are required')
  });

  it('returns 400 if only password is given', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { password: 'test123' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData()).message).toBe('Username and password are required')
  });

  it('returns 201 when no matching user exists and mocked insert is successful', async () => {
    usersCollection.findOne.mockResolvedValue(null);
    usersCollection.insertOne.mockResolvedValue({ insertedId: '123' });

    const { req, res } = createMocks({
      method: 'POST',
      body: { username: 'testUser', password: 'password123' }
    });

    await handler(req, res);
    expect(res._getStatusCode()).toBe(201);
  });

});