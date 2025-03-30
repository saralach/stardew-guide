import { useState } from "react";
import React from "react";
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

interface CheckSectionProps {
  sectionId: string;
  desc: string;
  children?: React.ReactNode[] | undefined;
  isChecked: boolean;
  onChange: (isChecked: boolean, checkboxId: string, subcategory: string) => void;
}

const CheckSection = React.memo(({ sectionId, desc, children, isChecked, onChange }: CheckSectionProps) => {
  const [sectionVisible, setSectionVisible] = useState(true);

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
                id={`${sectionId}-Checkbox`} 
                name={sectionId} 
                value={sectionId} 
                onChange={(e) => onChange(e.target.checked, sectionId, "None")} 
                checked={isChecked} />
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

});

export default CheckSection;

/*export default function CheckSection({ sectionId, desc, children, onChange }: CheckSectionProps) {
  const [sectionVisible, setSectionVisible] = useState(true);
  //const noSpaceId = sectionId.replaceAll(" ", "");

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
                id={`${sectionId}-Checkbox`} 
                name={sectionId} 
                value={sectionId} 
                onChange={(e) => onChange(e.target.checked, sectionId, "None")} 
                checked={isChecked} />
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

}*/