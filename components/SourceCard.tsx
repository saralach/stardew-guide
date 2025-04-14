import React from "react";
import { ReactNode } from "react";

interface SourceCardProps {
  topRowHead: ReactNode | string;
  topRowDetails?: ReactNode | string;
  additionalRows?: ReactNode[] | ReactNode | string;
}

export default function SourceCard({ topRowHead, topRowDetails, additionalRows }: SourceCardProps) {
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
        React.Children.toArray(additionalRows)
      }
    </article>
  )

} //end SourceCard()