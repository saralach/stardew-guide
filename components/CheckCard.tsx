import { useState } from "react";
import React from "react";
import { CardWidth } from "@/types";
import IconLink from "./IconLink";

interface CheckCardProps {
  task: string;
  altId?: string;
  isChecked: boolean;
  subcategory: string;
  onChange: (isChecked: boolean, checkboxId: string, subcategory: string) => void;
  children?: React.ReactNode[] | undefined;
  cardWidth?: CardWidth;
  iconLabel?: boolean;
  iconSrc: string;
}


export default function CheckCard({ task, altId, isChecked, subcategory, onChange, children, cardWidth=CardWidth.Thin, iconLabel=false, iconSrc }: CheckCardProps) {
  const id = altId ? altId : task;

  // Remove any children that are undefined; set children to undefined if no children remain in the array
  if(children != null) {
    children = children?.filter(child => child !== undefined);
    if(children.length === 0) {
      children = undefined;
    }
  }

  return (
    <article className={`card card-${cardWidth}`}>
      <div className={children ? "bottom-border" : ""}>
        <label className={children ? "flex flex-row" : "font-medium xs-font flex flex-row"}>
          <input 
            type="checkbox" 
            id={`${subcategory}-${id.replaceAll(" ", "")}`} 
            name={id} 
            value={id} 
            checked={isChecked} 
            onChange={(e) => onChange(e.target.checked, id, subcategory)} className="inline"/>
          {iconLabel ? <IconLink label={task} altImgSrc={iconSrc} isLink={false}/> : task}
        </label>
      </div>
      {
        children && <div className="pt-3">{children}</div>
      }
    </article>
  );
}