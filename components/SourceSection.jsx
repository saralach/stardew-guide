import IconLink from "./IconLink";
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from "react";

export default function SourceSection({ category, sources }) {
  const [sectionVisible, setSectionVisible] = useState(true);

  // ==================== Set Up Content ====================
  let sectionContent;

  const changeVisibility = () => {
    setSectionVisible(!sectionVisible);
  };

  const getLocationListItems = (locations) => {
    let locationListItems = [];
    
    locations.forEach( (location) => {
      locationListItems.push(
        <li className="list-none">
          {
            location.details ? `${location.location_name} (${location.details})` : location.location_name
          }
        </li>
      );
    });
    return locationListItems;
  };

  if(category === "Cooking" || "Crafting" || "Trading") {

  }
  else {
    sectionContent = sources.map( (source) => {
      return (
        source.source_name && <div className="card thin-card">
          {
             <IconLink key={source.source_name} category={category} label={source.source_name} 
              isLink={false} className="font-bold"
            />
          }
          {source.locations && <ul className="ps-6">{getLocationListItems(source.locations)}</ul>}
        </div>
      );
    }); //end sources.map()
  }





  // ======================== Return ========================
  return (
    <div id={`${category}Sources`} className="mb-8">
      
      <div className="flex flex-row items-center bottom-border" >
        <h3 className="text-center">
          {category}
        </h3>
        {
          sources.length > 1 && (
            sectionVisible ? (<ChevronUp onClick={changeVisibility} className="mx-2 text-gray-500" />
            ) : (
            <ChevronDown onClick={changeVisibility} className="mx-2 text-gray-500" />)
          )
        }
      </div>

      {
        sectionContent &&
          <div className={sectionVisible ? "ps-1 flex flex-row flex-wrap justify-center" : "hidden"}>
            { sectionContent }
          </div>
      }

    </div>
  );

} //end SourceSection()