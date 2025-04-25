/**
 * MODULE:  types/villagers.ts
 * 
 * SUMMARY:
 *   Defines TypeScript types (interfaces) for objects containing villager data; 
 *   for use across the app.
 */

export interface BasicVillagerData {
  name: string;
  gender: string;
  bday_season: string;
  bday_date: number;
  home_location: string;
  address: string;
  can_marry: boolean;
}

export interface FullVillagerData extends BasicVillagerData {
  name: string;
  gender: string;
  bday_season: string;
  bday_date: number;
  home_location: string;
  address: string;
  can_marry: boolean;
  gift_prefs: GiftPrefs;
}

export interface GiftPrefs {
  categories: GiftPrefCategory[];
  items: GiftPrefItem[]
}

export interface GiftPrefCategory {
  category: string;
  pref_num: number;
}

export interface GiftPrefItem {
  item_name: string;
  pref_num: number;
}