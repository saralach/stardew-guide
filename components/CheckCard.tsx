/**
 * MODULE:  components/CheckCard
 * 
 * SUMMARY:
 *   Displays a single requirement within a subcategory.
 * 
 * DEPENDENCIES:
 *   - react
 *   - components/IconLabel
 *   - components/InlineList
 *   - handleChkChange: checkbox onClick
 *   - types/enums: CardWidth enum definition
 * 
 * USED BY:
 *   - components/CheckSection.tsx
 */

import React, { useEffect, useState } from "react";
import IconLabel from "@/components/IconLabel";
import InlineList from "@/components/InlineList";
import handleChkChange from "@/lib/handleChkChange";
import { CardWidth } from "@/types/enums";

interface CheckCardProps {
  category: string;
  subcategory: string;
  req: any;
  initIsChecked: boolean;
  showIcon?: boolean;
}

function CheckCard ({ category, subcategory, req, initIsChecked, showIcon=false }: CheckCardProps) {

  const [isChecked, setIsChecked] = useState(false);
  let iconSrc = "";
  let cardWidth = CardWidth.Wide;
  let showGold = false;
  const checkboxId = req.req_id;
  let taskLabel = req.label ? req.label : req.req_id;
  let children: any[] | null = [];

  const updateCompletion = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(event.target.checked);
    handleChkChange(category, subcategory, checkboxId, event.target.checked);
  };

  // Make sure component rerenders when initIsChecked is changed (in case component is rendered 
  // before all data is retrieved)
  useEffect(() => {
    if(initIsChecked !== undefined)
      setIsChecked(initIsChecked);
  }, [initIsChecked])

  // ================= Determine how to display ====================
  if(req.icon_name)
    iconSrc = req.icon_name.trim().replace(" ", "_");

  // If gold is required, format it (add commas)
  const formattedGold = req.gold_reqd ? `${req.gold_reqd.toLocaleString("en-US")}g` : null;

  if(req.gold_reqd) {
    if(category === "Bundles" || subcategory === "Obelisks")
      showGold = true;
  }
  
  if(subcategory === "Stardrops") {
    cardWidth = CardWidth.Full;
    if(req.gold_reqd)
      taskLabel += ` (${formattedGold})`;
  }

  // ----- Create child components -----------------------------
  if(subcategory === "Fishing") {
    if(req.seasons) {
      children.push(
        <InlineList listItems={req.seasons} listName="Seasons" showIcons={true} />
      );
    }
    if(req.weather && req.weather[0] !== "Any") {
      children.push(
        <InlineList listItems={req.weather} listName="Weather" showIcons={true} />
      );
    }
    if(req.times) {
      children.push(
        <InlineList listItems={req.times} listName="Time" delimiter="bullet" />
      );
    }
    if(req.locations) {
      children.push(
        <InlineList listItems={req.locations} listName="Locations" delimiter="bullet" />
      );
    }
  }

  if(showGold && formattedGold)
    children.push(<IconLabel label={formattedGold} altImgSrc="Gold" />);
  
  if(req.items_reqd) {
    children.push(
      req.items_reqd.map((item_reqd: any, index: number) => {
        return (
          <IconLabel 
            key={`${req.label}-${item_reqd.item}-${index}`} 
            label={item_reqd.item} 
            qty={item_reqd.qty}
            isLink={true}
          />
        )
      })
    );
  }

  if(category === 'Bundles') {
    if(req.num_slots !== req.items_reqd?.length)
      children.push(<p className="pt-3 font-bold">{`Items Required: ${req.num_slots}`}</p>);
  }

  // Remove any undefined children; if children is empty array, set to null
  children = children?.filter(child => child !== undefined);
  if(children.length === 0)
    children = null;

  // ===================== Return Component ========================
  return (
    <article className={`card card-${cardWidth}`}>
      <div className={children ? "bottom-border" : ""}>
        <label className={children ? "flex flex-row" : "font-medium xs-font flex flex-row"}>
          <input 
            type="checkbox" 
            id={`${subcategory}${checkboxId.replaceAll(" ", "")}Checkbox`} 
            name={checkboxId} 
            value={checkboxId} 
            checked={isChecked} 
            onChange={updateCompletion} 
            className="inline"/>
          {showIcon ? <IconLabel label={taskLabel} altImgSrc={iconSrc} /> : taskLabel}
        </label>
      </div>
      {
        children && <div className="pt-3">{children}</div>
      }
    </article>
  );
};

export default CheckCard;