import { SourceInfo } from "@/types/itemInfoTypes";
import IconLabel, { ICON_SIZES } from "./IconLabel";
import { ChevronUp, ChevronDown, Icon } from 'lucide-react';
import { ReactNode, useState } from "react";
import InlineList from "./InlineList";

interface SourceCardProps {
  topRowHead: ReactNode | string;
  topRowDetails?: ReactNode | string;
  additionalRows?: ReactNode[] | ReactNode | string;
}

export default function SourceCard({ topRowHead, topRowDetails, additionalRows }: SourceCardProps) {

  return (
    <article className="card card-wide">
      <div className={`flex flex-row items-center justify-between ${additionalRows && "bottom-border"}`}>
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

} //end SourceCard()