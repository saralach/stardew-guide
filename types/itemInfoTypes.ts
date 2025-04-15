// -------- For data from api/items/[itemname] --------
export interface ItemInfo {
  item_name: string;
  desc: string;
  category: string;
  gift_type?: string;
  sell_price?: number;
  energy?: number;
  health?: number;
  max_quality?: string;
  sources: SourceCategory[];
  uses: UsageCategory[];
}

export interface UsageCategory {
  use_category: string;
  uses: UsageInfo[];
}

export interface UsageInfo {
  product_name: string;
  equipment_name?: string;
  qty_obtained?: number;
  item_costs?: ItemCost[];
  other_detail?: string;
}

export interface SourceCategory {
  source_category: string;
  sources: SourceInfo[];
}

export interface SourceInfo {
  source_category: string;
  source_name?: string;
  locations?: SourceLocation[];
  probability?: number;
  qty_obtained?: number;
  max_qty_obtained?: number;
  item_costs?: ItemCost[];
  gold_cost?: number;
  seasons?: string[];
  weather?: string[];
  times_of_day?: TimeOfDay[]
  other_detail?: string;
}

export interface SourceLocation {
  location_name: string;
  details: string;
}

export interface ItemCost {
  item: string;
  qty: number;
}

export interface TimeOfDay {
  start_time: string;
  end_time: string;
}


// -------- For data from api/items/ ------------------
export interface ItemCategory {
  _id: string;
  items: string[];
}