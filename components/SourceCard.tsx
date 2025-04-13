import { ReactNode } from "react";

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