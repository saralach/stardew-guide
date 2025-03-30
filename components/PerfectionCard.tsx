import { useState } from "react";
import InlineList from "./InlineList";
import { CardWidth } from "@/types";
import IconLink from "./IconLink";
import CheckCard from "./CheckCard";

interface PerfectionCardProps {
  subcategory: string;
  req: any;
  initIsChecked: boolean;
}


function PerfectionCard({subcategory, req, initIsChecked}: PerfectionCardProps) {

  const reqIconLabelSections = [
    'Items Shipped', 'Monster Slayer','Great Friends', 'Level 10 Skills', 'Cooking', 
    'Crafting', 'Fishing'
  ];
  let cardWidth = CardWidth.Wide;
  let showGold = false;
  let showIcons = false;
  let taskLabel = req.label ? req.label : req.req_id;
  let iconSrc;
  let formattedGold;
  let children = [];

  // ----- Format gold amount (add commas) ---------------------
  if(req.gold_reqd)
    formattedGold = `${req.gold_reqd.toLocaleString('en-US')}g`;

  // ----- Determine how to display based on subcategory -------
  if(reqIconLabelSections.includes(subcategory)) {
    showIcons=true;
    if(req.icon_name)
      iconSrc = req.icon_name.trim().replace(" ", "_");
  }

  if(subcategory === "Obelisks") {
    if(req.gold_reqd)
      showGold = true;
  }

  else if(subcategory === "Stardrops") {
    cardWidth = CardWidth.Full;
    if(req.gold_reqd)
      taskLabel += ` (${formattedGold})`;
  }

  else if(subcategory === "Monster Slayer") {
    if(req.icon_name)
      iconSrc = `Monster/${iconSrc}`;
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

  // ----- Return CheckCard Component --------------------------
  return (
    <CheckCard 
      key={`${subcategory}-${req.id_num}`} 
      category={"Perfection"}
      subcategory={subcategory}
      task={taskLabel} 
      altId={req.label && req.req_id} 
      initIsChecked={initIsChecked} 
      iconLabel={showIcons}
      cardWidth={cardWidth}
      iconSrc={iconSrc} >
      {children}
    </CheckCard>
  );
}

export default PerfectionCard;