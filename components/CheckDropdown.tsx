import { useState } from "react";
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

interface CheckDropdownProps {
    checkContent: string;
    dropdownContent: string;
    inputId: string;
    /*rightAlign?: boolean;*/
}

function CheckDropdown({ checkContent, dropdownContent, inputId }: CheckDropdownProps)  {
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
                {checkContent}
            </label>
            <ChevronDown className="inline"/>
        </div>
    );
}

export default CheckDropdown;