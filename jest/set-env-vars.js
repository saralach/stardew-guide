/**
 * MODULE:  jest/set-env-vars.js
 * 
 * SUMMARY:
 *   Environment variable setup to prevent errors with variables being undefined.
 */

process.env.MONGODB_URI = 'mongodb://localhost:27017';
process.env.MONGODB_DB = 'my_test_db';