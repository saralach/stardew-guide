import IconLink from "./IconLink";
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from "react";

export default function SourceSection({ category, sources, itemName }) {
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

  if(category === "Cooking" || category === "Crafting") {
    sectionContent = sources.map( (source) => {
      return (
            <article className="card thin-card">
              <div className="bottom-border block w-full">
                <h4>
                  <IconLink label={itemName} />
                </h4>
              </div>
                <div className="pt-3">
                  {
                    source.item_costs?.map( (item) => (
                      <IconLink 
                        label={item.item}
                        qty={item.qty ? item.qty : undefined}
                        isLink={false}
                      />
                    ))
                  }
                </div>
            </article>
      );
    });
  }

  else if(category === "Buying") {
    sectionContent = sources.map( (source) => {
      return (
        source.source_name && <div className="card thin-card">
          {
            <div className="flex flex-row items-center justify-between">
              <IconLink 
                label={source.source_name}
                category="Icon"
                altImgSrc={`${source.source_name}_Icon`}
                isLink={false}
                className="font-bold"
              />
              <IconLink 
                label={`${source.gold_cost}g`}
                altImgSrc="Gold"
                isLink={false}
              />
            </div>
          }
          {source.locations && <ul className="ps-6">{getLocationListItems(source.locations)}</ul>}
        </div>
      );
    }); //end sources.map()
  }

  else if(category === "Equipment") {
    sectionContent = sources.map( (source) => {
      return (
            <article className="card thin-card">
              <div className="bottom-border block w-full">
                <h4>
                  {source.source_name}
                </h4>
              </div>
                <div className="pt-3">
                  {
                    source.item_costs?.map( (item) => (
                      <IconLink 
                        label={item.item}
                        qty={item.qty ? item.qty : undefined}
                        isLink={false}
                      />
                    ))
                  }
                </div>
            </article>
      );
    });
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
          sectionContent && (
            sectionVisible ? (
              <ChevronUp onClick={changeVisibility} className="chevron-btn" />
            ) : (
              <ChevronDown onClick={changeVisibility} className="chevron-btn" />
            )
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