// Things in this file apply to all tests!!

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
  default: () => <div>Mocked Icon</div>, // simple functional mock
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { itemname: 'strawberry' },
    pathname: '/Items/[itemname]',
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));