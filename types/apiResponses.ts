/**
 * MODULE:  types/apiResponses.ts
 * 
 * SUMMARY:
 *   Defines TypeScript types (interfaces) for API responses; for use across the app.
 */

export interface ErrorResponse {
  error: string;
}

export interface MsgResponse {
  message: string;
}

export interface GeneralResponse {
  error?: string;
  message?: string;
}