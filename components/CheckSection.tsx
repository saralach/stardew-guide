import { useState } from "react";
import React from "react";
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { SingleReq } from "@/types/trackerReqTypes";
import CheckCard from "@/components/CheckCard";
import handleChkChange from "@/lib/handleChkChange";

interface CheckSectionProps {
  category: string;
  sectionId: string;
  desc: string;
  reqs?: SingleReq[];
  initCompletedTasks: string[];
  mainTaskIsComplete?: boolean;
  showIcons?: boolean;
}

function CheckSection({ category, sectionId, desc, reqs, initCompletedTasks=[], 
                        mainTaskIsComplete=false, showIcons=false }: CheckSectionProps) {
                          
  const [sectionVisible, setSectionVisible] = useState(true);
  const [isComplete, setIsComplete] = useState(mainTaskIsComplete);

  console.log(`CheckSection -- category = ${category}, sectionId = ${sectionId}`)
  console.log(initCompletedTasks);

  const toggleVisibility = () => {
    setSectionVisible(!sectionVisible);
  };

  const updateCompletion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsComplete(!isComplete);
    handleChkChange(category, null, sectionId, event.target.checked);
  };

  function getInitialCompletion(req: SingleReq) {
    const isComplete = initCompletedTasks.some((task) => task === req.req_id);
    if(isComplete)
      console.log(`INITIAL COMPLETION for ${req.req_id}: ${isComplete}`);
    return isComplete;
  };

  return (
    <section id={sectionId} className="card">
      <div className="flex justify-between">
        {
          reqs ? (
            <h4 className="ps-8">{desc}</h4>
          ) : (
            <label>
              <input
                type="checkbox"
                id={`${sectionId}Checkbox`}
                name={sectionId}
                value={sectionId}
                onChange={updateCompletion}
                checked={isComplete}
              />
              {desc}
            </label>
          )
        }
        {
          reqs && (
            sectionVisible ? (
              <ChevronUp onClick={toggleVisibility} className="inline chevron-btn" />
            ) : (
              <ChevronDown onClick={toggleVisibility} className="inline chevron-btn" />
            )
          )
        }
      </div>
      {
        sectionVisible && reqs &&
        <div className="flex flex-row flex-wrap justify-center" >
          {
            reqs?.map((req) => {
              return (
                <CheckCard
                  key={req.req_id}
                  category={category}
                  subcategory={sectionId}
                  req={req} 
                  initIsChecked={getInitialCompletion(req)}
                  showIcon={showIcons}
                />
              )
            })
          }
        </div>
      }
    </section>
  );

};

export default CheckSection;