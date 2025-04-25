/**
 * MODULE:  types/enums.ts
 * 
 * SUMMARY:
 *   Defines enums for use across the app.
 */

export enum CardWidth {
  Full = "full",
  Thin = "thin",
  Wide = "wide"
}

export enum HttpStatus {
  OK = "200",
  NotFound = "404",
  InternalServerError = "500"
}

export enum GiftPrefs {
  Love    = 5,
  Like    = 4,
  Neutral = 3,
  Dislike = 2,
  Hate    = 1
}
