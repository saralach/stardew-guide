import { useState } from "react";
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

interface CheckItemProps {
    content: string;
    inputId: string;
    /*rightAlign?: boolean;*/
}

function CheckItem({ content, inputId }: CheckItemProps)  {
    const [isChecked, setIsChecked] = useState(false);
    //const [isVisible, setIsVisible] = 
    
    const handleOnChange = () => {
        setIsChecked(!isChecked);
    }

    return (
        <div className="check-container flex justify-between">
            <label>
                <input 
                    type="checkbox" 
                    id={`${inputId}-checkbox`} 
                    name={inputId} 
                    value={inputId} 
                    checked={isChecked} 
                    onChange={handleOnChange} />
                {content}
            </label>
            <ChevronDown className="inline"/>
        </div>
    );
}

export default CheckItem;