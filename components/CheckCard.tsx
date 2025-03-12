import { useState } from "react";
import React from "react";
import { CardWidth } from "@/types";

interface CheckCardProps {
  task: string;
  altId?: string;
  isChecked: boolean;
  onChange: any;
  category: string;
  children?: React.ReactNode;
  cardWidth?: CardWidth;
}


export default function CheckCard({ task, altId, isChecked, onChange, children, cardWidth=CardWidth.Thin  }: CheckCardProps) {
  const id = altId ? altId.replace(" ", "") : task.replace(" ", "");


  return (
    <article className={`card card-${cardWidth}`}>
      <div className={children ? "bottom-border" : ""}>
        <label className={children ? "" : "font-medium xs-font"}>
          <input 
            type="checkbox" 
            id={`${id}Checkbox`} 
            name={id} 
            value={id} 
            checked={isChecked} 
            onChange={(e) => onChange(e.target.checked, id)}/>
          {task}
        </label>
      </div>
      {
        children && <div className="pt-3">{children}</div>
      }

    </article>
  );
}







/*
interface CheckItemProps {
  content: string;
  inputId: string;
}

export default function CheckItem({ content, inputId }: CheckItemProps)  {
  const [isChecked, setIsChecked] = useState(false);
  //const [isVisible, setIsVisible] = 
  
  const handleOnChange = () => {
      setIsChecked(!isChecked);
  }

  return (
      <div className="check-container flex justify-between">
          <label>
              <input 
                  type="checkbox" 
                  id={`${inputId}-checkbox`} 
                  name={inputId} 
                  value={inputId} 
                  checked={isChecked} 
                  onChange={handleOnChange} />
              {content}
          </label>
          <ChevronDown className="inline"/>
      </div>
  );
}
*/