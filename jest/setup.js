/**
 * MODULE:  jest/testHelpers.ts
 * 
 * SUMMARY:
 *   Global setup for all jest tests. Applies to all tests / test suites.
 * 
 * DEPENDENCIES:
 *   util: for avoiding ReferenceErrors in tests
 */

import { TextEncoder, TextDecoder } from 'util';

// Adds matchers toHaveContext(), toBeInTheDocument(), etc.
import '@testing-library/jest-dom'; 

// Avoid "ReferenceError: TextEncoder is not defined"
if (typeof global.TextEncoder === 'undefined')
  global.TextEncoder = TextEncoder;

if (typeof global.TextDecoder === 'undefined')
  global.TextDecoder = TextDecoder;

// ------------ Global Mocks (necessary to prevent errors) ------------
jest.mock('lucide-react', () => ({
  __esModule: true, // if you're using ESModule interop
  ChevronUp: () => <div>Mocked ChevronUp</div>,
  ChevronDown: () => <div>Mocked ChevronDown</div>,
  Icon: () => <div>Mocked Icon</div>,
  default: () => <div>Mocked Icon</div>, // simple functional mock
}));

