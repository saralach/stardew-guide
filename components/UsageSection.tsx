import { UsageInfo } from "@/types/itemInfoTypes";
import IconLabel, { ICON_SIZES } from "@/components/IconLabel";
import { ChevronUp, ChevronDown } from 'lucide-react';
import { ReactNode, useState } from "react";
import InlineList from "@/components/InlineList";
import SourceCard from "@/components/SourceCard";

interface SourceSectionProps {
  category: string;
  uses: UsageInfo[];
}

export default function SourceSection({ category, uses }: 
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
  const getSourceCards = (use: UsageInfo): ReactNode | ReactNode[] => {
    const additionalRows = [];

    use.equipment_name && additionalRows.push(
      <div className="bottom-border">
        <IconLabel label={use.equipment_name} iconSize={ICON_SIZES.XS} />
      </div>
    );
    use.item_costs && additionalRows.push(
      <div className="pt-3">
        {
          use.item_costs?.map( (item) => (
            <IconLabel label={item.item} qty={item.qty} />
          ))
        }
      </div>
    );
    
    return (
      <SourceCard 
        topRowHead={
          <IconLabel label={use.product_name} 
            qty={use.qty_obtained !== 1 ? use.qty_obtained : undefined} 
            qtyAfter={true}
          />
        }
        additionalRows={additionalRows}
      />
    );

  }//end getSourceContent()


  // ------- Get Source Cards -------------------------
  let sectionContent: ReactNode[] | null = uses.map( (use) =>  
    getSourceCards(use)
  );

  // ------- Remove Any Undefined Source Cards --------
  sectionContent = sectionContent.filter(sourceCard => sourceCard !== undefined);
  if(sectionContent.length === 0)
    sectionContent = null;


  // ======================== Return ========================
  return (
    <div id={`${category}Uses`} className="mb-8">
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