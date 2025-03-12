import { useState } from "react";
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';


export default function CheckSection({ sectionId, desc, children }) {
  const [sectionVisible, setSectionVisible] = useState(true);
  const noSpaceId = sectionId.replace(" ", "");

  const changeVisibility = () => {
    setSectionVisible(!sectionVisible);
  };

  return (
    <section id={sectionId} className="card">
      <div className="flex justify-between">
        <label>
          <input 
            type="checkbox" 
            id={`${noSpaceId}Checkbox`} 
            name={`${noSpaceId}Checkbox`} 
            value={"Shipped Collection"} 
            /*checked={"isChecked"} 
            onChange={handleOnChange}*/ />
          {desc}
        </label>
        {
          sectionVisible ? (
            <ChevronUp onClick={changeVisibility} className="inline chevron-btn" />
          ) : (
            <ChevronDown onClick={changeVisibility} className="inline chevron-btn" />
          )
        }

      </div>

      <div className="flex flex-row" /*className="flex flex-row basis-lg"*/>
        {sectionVisible && children}
      </div>

    </section>
  );

}







/*
interface CheckDropdownProps {
  checkContent: string;
  dropdownContent: string;
  inputId: string;
}

function CheckDropdown({ checkContent, dropdownContent, inputId }: CheckDropdownProps)  {

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
        {checkContent}
      </label>
      <ChevronDown className="inline"/>
    </div>
  );
}

export default CheckDropdown;*/