export interface ReqGroup {
  label: string;
  reqs: any[];
  subcategory: string;
  subcategory_id: number;
}

export interface SubcategoryReqs {
  subcategory: string;
  subcategory_id: number;
  reqs: SingleReq[];
  label?: string;
}

export interface SingleReq {
  req_id: string;
  id_num: number;
  gold_reqd?: number;
  items_reqd?: ReqItem[];
  icon_name?: string;
  label?: string;
  qty?: number;
}

export interface ReqItem {
  item: string;
  qty: number;
}