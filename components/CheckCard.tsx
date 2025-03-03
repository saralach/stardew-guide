import { useState } from "react";
import IconLink from "./IconLink";

interface CheckCardProps {
    task: string;
    taskDetails?: TaskDetails[];
}

export interface TaskDetails {
    itemCategory?: string;
    itemName: string;
    qty?: number;
}


export default function CheckCard({task, taskDetails }: CheckCardProps) {
        const [isChecked, setIsChecked] = useState(false);





        return (
            <article id="water-obelisk-card" className="card">
                <label className="check-container bottom-border">
                    <input 
                        type="checkbox" 
                        id={"water-obelisk-checkbox"} 
                        name={"water-obelisk"} 
                        value={"Water Obelisk"} 
                        /*checked={"isChecked"} 
                        onChange={handleOnChange}*//>
                        Water Obelisk
                </label>
                <div className="pt-3">
                    <IconLink label="500,000g" altImgSrc="Gold" isLink={false}/>
                    <IconLink category="Resource" label="Iridium Bar" qty={10}/>
                    <IconLink category="Fish" label="Clam" qty={10}/>
                    <IconLink category="Fish" label="Coral" qty={10}/>
                </div>
            </article>
        );
}