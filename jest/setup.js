import { TextEncoder, TextDecoder } from 'util';

// Avoid "ReferenceError: TextEncoder is not defined"
if (typeof global.TextEncoder === 'undefined')
  global.TextEncoder = TextEncoder;

if (typeof global.TextDecoder === 'undefined')
  global.TextDecoder = TextDecoder;