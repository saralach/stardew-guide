/**
 * MODULE:  components/ItemDetailCard
 * 
 * SUMMARY:
 *   Displays a card containing a single source or use of an item.
 *
 * DEPENDENCIES:
 *   - react: for component rendering & ReactNode type
 * 
 * USED BY:
 *   - components/SourceSection
 *   - components/UsageSection
 */

import React, { ReactNode } from "react";

interface ItmDtlProps {
  topRowHead: ReactNode | string;
  topRowDetails?: ReactNode | string;
  additionalRows?: ReactNode[] | ReactNode | string;
}

export default function ItemDetailCard({ topRowHead, topRowDetails, additionalRows }: ItmDtlProps) {
  // add keys to additional rows if needed
  additionalRows = Array.isArray(additionalRows) ? 
      React.Children.toArray(additionalRows) : additionalRows; 

  return (
    <article className="card card-wide">
      <div 
        className={`flex flex-row items-center justify-between ${additionalRows && "bottom-border"}`}
      >
        <h6>
          {topRowHead}
        </h6>
        {
          topRowDetails && topRowDetails
        }
      </div>
      {
        additionalRows
      }
    </article>
  )

} //end ItemDetailCard()