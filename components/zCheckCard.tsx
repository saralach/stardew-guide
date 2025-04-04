import { useState } from "react";
import React from "react";
import { CardWidth } from "@/types";
import IconLink from "./IconLink";
import handleChkChange from "@/lib/handleChkChange";

interface zCheckCardProps {
  initIsChecked: boolean;
  category: string;
  subcategory: string;
  task: string;
  altId?: string;
  iconSrc?: string;
  iconLabel?: boolean;
  cardWidth?: CardWidth;
  children?: React.ReactNode[] | null;
}

function zCheckCard ({ initIsChecked, category, subcategory, task, altId, iconSrc, iconLabel=false,
                      cardWidth=CardWidth.Thin, children=null }: zCheckCardProps) {

  const [isChecked, setIsChecked] = useState(initIsChecked);
  const checkboxId = altId ? altId : task;

  const updateCompletion = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(event.target.checked);
    handleChkChange(category, subcategory, checkboxId, event.target.checked);
  };

  // Remove any undefined children; if no children left in array, set children to null
  if(children != null) {
    children = children?.filter(child => child !== undefined);
    if(children.length === 0)
      children = null;
  }

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
          {iconLabel ? <IconLink label={task} altImgSrc={iconSrc} isLink={false}/> : task}
        </label>
      </div>
      {
        children && <div className="pt-3">{children}</div>
      }
    </article>
  );
};

export default zCheckCard;