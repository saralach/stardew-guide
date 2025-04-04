import { useState } from "react";
import React from "react";
import { CardWidth } from "@/types";
import IconLink from "./IconLink";
import handleChkChange from "@/lib/handleChkChange";
import InlineList from "./InlineList";

interface CheckCardProps {
  category: string;
  subcategory: string;
  req: any;
  initIsChecked: boolean;
  showIcon?: boolean;
}

function CheckCard ({ category, subcategory, req, initIsChecked, showIcon=false }: CheckCardProps) {
  const [isChecked, setIsChecked] = useState(initIsChecked);

  // ================= Determine how to display ====================
  // Determine whether to show icons & get icon url

  let iconSrc = "";
  //let showIcon = false;
  
  let cardWidth = CardWidth.Wide;
  let showGold = false;
  const checkboxId = req.req_id;
  let taskLabel = req.label ? req.label : req.req_id;
  let children: any[] | null = [];

  /*if(iconSubcategories.includes(subcategory)) {
    showIcons=true;*/
    if(req.icon_name)
      iconSrc = req.icon_name.trim().replace(" ", "_");
  //}
  // If gold is required, format it (add commas)
  const formattedGold = req.gold_reqd ? `${req.gold_reqd.toLocaleString('en-US')}g` : null;

  if(subcategory === "Obelisks" && req.gold_reqd)
      showGold = true;

  else if(subcategory === "Stardrops") {
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

  if(showGold)
    children.push(<IconLink label={`${req.gold_reqd}g`} altImgSrc="Gold" isLink={false} />);
  
  if(req.items_reqd) {
    children.push(
      req.items_reqd.map((item_reqd: any) => {
        return <IconLink key={item_reqd.item} label={item_reqd.item} qty={item_reqd.qty} />
      })
    );
  }

  const updateCompletion = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(event.target.checked);
    handleChkChange(category, subcategory, checkboxId, event.target.checked);
  };

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
          {showIcon ? <IconLink label={taskLabel} altImgSrc={iconSrc} isLink={false}/> : taskLabel}
        </label>
      </div>
      {
        children && <div className="pt-3">{children}</div>
      }
    </article>
  );
};

export default CheckCard;