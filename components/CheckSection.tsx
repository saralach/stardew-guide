import { useState } from "react";
import React from "react";
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { SectionReq } from "@/types";
import PerfectionCard from "@/components/PerfectionCard"
import { useSession } from "next-auth/react";
import handleChkChange from "@/lib/handleChkChange";

interface CheckSectionProps {
  category: string;
  sectionId: string;
  desc: string;
  reqs?: SectionReq[];
  initCompletedTasks: string[];
  mainTaskIsComplete: boolean;
}

function CheckSection({ category, sectionId, desc, reqs, initCompletedTasks=[], mainTaskIsComplete }: 
      CheckSectionProps) {
  const { data: session, status } = useSession();
  const [sectionVisible, setSectionVisible] = useState(true);
  const [isComplete, setIsComplete] = useState(mainTaskIsComplete);

  console.log(`initCompletedTasks in ${sectionId}'s CheckSection:`);
  console.log(initCompletedTasks);

  const toggleVisibility = () => {
    setSectionVisible(!sectionVisible);
  };

  const updateCompletion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsComplete(!isComplete);
    handleChkChange(category, null, sectionId, event.target.checked);
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
                checked={isComplete} />
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
          ))
        }
      </div>
      {
        sectionVisible && reqs &&
        <div className="flex flex-row flex-wrap justify-center" >
          {
            reqs?.map((req) => {
              return <PerfectionCard subcategory={sectionId} req={req} 
                initIsChecked={initCompletedTasks.some((task) => task === req.req_id)}/>
            })
          }
        </div>
      }

    </section>
  );

};

export default CheckSection;



/*const handleChkChange = async (isChecked: boolean, checkboxId: string, subcategory: string) => {
  if(status === "authenticated") {
    const res = await fetch("/../pages/api/saveCheckboxData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.accessToken}`
      },
      body: JSON.stringify({
        checkboxId: checkboxId,
        isChecked: isChecked,
        category: category,
        subcategory: subcategory
      }),
    });

    const data = res.json();
    if(!(data.status === 200))
      console.log("Updated checkbox data not saved.");
  }
} //end handleChkChange()*/