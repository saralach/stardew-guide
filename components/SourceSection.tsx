import { SourceInfo } from "@/types/itemInfoTypes";
import IconLabel, { ICON_SIZES } from "@/components/IconLabel";
import { ChevronUp, ChevronDown, Icon } from 'lucide-react';
import { ReactNode, useState } from "react";
import InlineList from "@/components/InlineList";
import SourceCard from "@/components/SourceUseCard";

interface SourceSectionProps {
  category: string;
  sources: SourceInfo[];
  itemName: string;
}

export default function SourceSection({ category, sources, itemName }: 
      SourceSectionProps) {
        
  const [sectionVisible, setSectionVisible] = useState(true);

  const changeVisibility = () => {
    setSectionVisible(!sectionVisible);
  };
  
  const formatProbability = (probability: number | undefined): ReactNode | undefined => {
    if(probability === undefined)
      return undefined;
    return (
      <p>{`${parseFloat((probability * 100).toFixed(2))}%`}</p>
    );
  };

  // ==================== Set Up Content ====================
  const getSourceCards = (source: SourceInfo): ReactNode | ReactNode[] => {

    switch(category) {

      case "Cooking":
      case "Crafting":
      case "Equipment":
        const additionalRows = [];

        category === "Equipment" && source.source_name && additionalRows.push(
          <div className="bottom-border">
            <IconLabel label={source.source_name} iconSize={ICON_SIZES.XS} />
          </div>
        );
        source.item_costs && additionalRows.push(
          <div className="pt-3">
            {
              source.item_costs?.map( (item) => (
                <IconLabel label={item.item} qty={item.qty} />
              ))
            }
          </div>
        );
        
        return (
          <SourceCard 
            topRowHead={
              <IconLabel label={itemName} 
                qty={source.qty_obtained} 
                maxQty={source.max_qty_obtained} 
                qtyAfter={true}
              />
            }
            additionalRows={additionalRows}
          />
        );

      case "Trading":
      case "Buying":
        return source.source_name && (
          <SourceCard 
            topRowHead={
              <IconLabel 
                label={source.source_name} 
                category="Icon" 
                altImgSrc={`${source.source_name}_Icon`}
              />
            } 
            topRowDetails={
              source.gold_cost && <IconLabel label={`${source.gold_cost}g`} altImgSrc="Gold" />
            }
            additionalRows={
              source.item_costs && <div>
                {
                  source.item_costs?.map( (itemCost) => (
                    <IconLabel 
                      label={itemCost.item}
                      qty={itemCost.qty}
                    />
                  )) 
                }
              </div>
            }
          />
        );

      case "Artifact Spot":
      case "Foraging":
        return (
          source.locations?.map( (location) => (
            <SourceCard 
              topRowHead={location.location_name} 
              topRowDetails={formatProbability(source.probability)} 
            />
          ))
        )



      case "Fishing":
        let catchingDetails = (
          <div className="pt-2">
            {
              source.locations && (
                <InlineList 
                  listName="Locations"
                  listItems={source.locations?.map((location) => location.location_name)}
                  delimiter="bullet"
                />
              )
            }
            {
              source.seasons && (
                <InlineList 
                  listName="Seasons"
                  listItems={source.seasons}
                  delimiter="bullet"
                  showIcons={source.seasons[0] === "Any"}
                />
              )
            }
            {
              source.weather && (
                <InlineList 
                  listName="Weather"
                  listItems={source.weather}
                  delimiter="bullet"
                  showIcons={source.weather[0] === "All"}
                />
              )
            }
          </div>
        );
        return (
          <SourceCard
            topRowHead={<IconLabel label={itemName} />}
            additionalRows={catchingDetails}
          />
        );

      default: // "Geodes", "Animal", "Mining", "Monster", "Farming" ("Panning", "Crab Pot")
        return source.source_name && (
          <SourceCard
              topRowHead={<IconLabel label={source.source_name} 
              category={category === "Mining" || category === "Monster" ? category : undefined}/>}
              topRowDetails={formatProbability(source.probability)}  
            />
        );

    }// end switch

  }//end getSourceContent()


  // ------- Get Source Cards -------------------------
  let sectionContent: ReactNode[] | null = sources.map( (source) =>  
    getSourceCards(source)
  );

  // ------- Remove Any Undefined Source Cards --------
  sectionContent = sectionContent.filter(sourceCard => sourceCard !== undefined);
  if(sectionContent.length === 0)
    sectionContent = null;


  // ======================== Return ========================
  return (
    <div id={`${category}Sources`} className="mb-8">
      <div className="flex flex-row items-center" >
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
          <div className={sectionVisible ? "ps-1 flex flex-row flex-wrap justify-center":"hidden"}>
            { sectionContent }
          </div>
      }
    </div>
  );

} //end SourceSection()