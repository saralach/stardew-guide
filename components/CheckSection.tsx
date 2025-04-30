/**
 * MODULE:  components/CheckSection
 * 
 * SUMMARY:
 *   Displays a subcategory of requirements. May be a single requirement or a group of requirements.
 * 
 * DEPENDENCIES:
 *   - lucide-react: Icons
 *   - react
 *   - components/CheckCard: displaying nested requirements
 *   - handleChkChange: checkbox onClick
 *   - types/trackerReqs: requirement type definition
 * 
 * USED BY:
 *   Tracker Pages
 *   - pages/Tracker/Bundles.tsx
 *   - pages/Tracker/Museum.tsx
 *   - pages/Tracker/Perfection.tsx
 */

import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from "react";
import CheckCard from "@/components/CheckCard";
import handleChkChange from "@/lib/handleChkChange";
import { SingleReq } from "@/types/trackerReqs";


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

  const toggleVisibility = () => {
    setSectionVisible(!sectionVisible);
  };

  const updateCompletion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsComplete(!isComplete);
    handleChkChange(category, null, sectionId, event.target.checked);
  };

  function getInitialCompletion(req: SingleReq) {
    return initCompletedTasks.some((task) => task === req.req_id);
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
                  key={`${category}${req.req_id}`}
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