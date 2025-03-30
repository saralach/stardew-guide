import { useState } from "react";
import React from "react";
import { CardWidth } from "@/types";
import IconLink from "./IconLink";
import handleChkChange from "@/lib/handleChkChange";

interface CheckCardProps {
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

function CheckCard ({ initIsChecked, category, subcategory, task, altId, iconSrc, iconLabel=false,
                      cardWidth=CardWidth.Thin, children=null }: CheckCardProps) {

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

export default CheckCard;







/*export default function CheckCard ({ task, altId, initIsChecked, subcategory, onChange, children, cardWidth=CardWidth.Thin, iconLabel=false, iconSrc }: CheckCardProps) {
  const [isChecked, setIsChecked] = useState(initIsChecked);
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
            id={`${subcategory}${id.replaceAll(" ", "")}Checkbox`} 
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
};*/


/*export default function CheckCard({ task, altId, isChecked, subcategory, onChange, children, cardWidth=CardWidth.Thin, iconLabel=false, iconSrc }: CheckCardProps) {
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
}*/