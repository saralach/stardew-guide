/**
 * MODULE:  components/UsageSection
 * 
 * SUMMARY:
 *   Displays a single category of item uses.
 *
 * DEPENDENCIES:
 *   - lucide-react: icons
 *   - react: ReactNode type, component states, etc.
 *   - components/IconLabel: display
 *   - components/ItemDetailCard: display
 *   - types/items: UsageInfo type
 * 
 * USED BY:
 *   - pages/Items/[itemname].tsx
 */

import { ChevronDown, ChevronUp } from 'lucide-react';
import { ReactNode, useState } from "react";
import IconLabel, { ICON_SIZES } from "@/components/IconLabel";
import ItemDetailCard from "@/components/ItemDetailCard";
import { UsageInfo } from "@/types/items";

interface UsageSectionProps {
  category: string;
  uses: UsageInfo[];
}

export default function UsageSection({ category, uses }: UsageSectionProps) {
        
  const [sectionVisible, setSectionVisible] = useState(true);

  const changeVisibility = () => {
    setSectionVisible(!sectionVisible);
  };

  // ==================== Set Up Content ====================
  const getUseCards = (use: UsageInfo, index: number): ReactNode | ReactNode[] => {
    const additionalRows = [];

    use.equipment_name && additionalRows.push(
      <div className="bottom-border" key={`${index}-${additionalRows.length}`}>
        <IconLabel label={use.equipment_name} iconSize={ICON_SIZES.XS} />
      </div>
    );
    use.item_costs && additionalRows.push(
      <div className="pt-3" key={`${index}-cost`}>
        {
          use.item_costs?.map( (item) => (
            <IconLabel label={item.item} qty={item.qty} key={`${index}-cost-${item.item}`} />
          ))
        }
      </div>
    );
    
    return (
      <ItemDetailCard 
        topRowHead={
          <IconLabel label={use.product_name} 
            qty={use.qty_obtained !== 1 ? use.qty_obtained : undefined} 
            qtyAfter={true}
          />
        }
        additionalRows={additionalRows}
        key={index}
      />
    );

  }//end getUseCards()


  // ------- Get Use Cards -------------------------
  let sectionContent: ReactNode[] | null = uses.map( (use, index) =>  
    getUseCards(use, index)
  );

  // ------- Remove Any Undefined Use Cards --------
  sectionContent = sectionContent.filter(useCard => useCard !== undefined);
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

} //end UsageSection()