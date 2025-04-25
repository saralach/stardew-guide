/**
 * MODULE:  types/userProgress.ts
 * 
 * SUMMARY:
 *   Defines TypeScript type (interface) for objects containing user progress / checkbox data; 
 *   for use across the app.
 */

export interface CheckData {
  message?: string;
  checkbox_id: string;
  subcategory: string;
}