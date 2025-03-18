import { useState } from "react";
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';


export default function CheckSection({ sectionId, desc, children }) {
  const [sectionVisible, setSectionVisible] = useState(true);
  const noSpaceId = sectionId.replaceAll(" ", "");

  const changeVisibility = () => {
    setSectionVisible(!sectionVisible);
  };

  return (
    <section id={sectionId} className="card">
      <div className="flex justify-between">
        {
          children ? (
            <h4 className="ps-8">{desc}</h4>
          ) : (
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
          )
        }
        {
          children && (
          sectionVisible ? (
            <ChevronUp onClick={changeVisibility} className="inline chevron-btn" />
          ) : (
            <ChevronDown onClick={changeVisibility} className="inline chevron-btn" />
          ))
        }

      </div>
      {
        sectionVisible && children && (
        <div className="flex flex-row flex-wrap justify-center" >
          {children}
        </div>)
      }


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