import { useState } from "react";
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import IconLink from "./IconLink";

interface SingleCheckProps {
  key: number;
  requirement: string;
  reqCategory: string;
  goldReqd? : number;
  reqItems: ReqItem[];
}

/**/interface ReqItem {
  item: string;
  qty?: number;
}

function SingleCheck({ key, requirement, reqCategory, goldReqd, reqItems }: SingleCheckProps)  {
  const [isChecked, setIsChecked] = useState(false);

  // Will (probably) have to get user data here? or maybe pass it in?
    
  const handleOnChange = async () => {
    setIsChecked(!isChecked);
    
    /*
    try {
      const res = await fetch('/api/saveCheckboxData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isChecked),
      });

      if (res.ok)
        alert('Data saved successfully');
      else
        alert('Failed to save data');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data');
    }
    */
  };

  return (
    <article id={`${requirement}-card"`} className="card w-60">
      <div className="bottom-border block w-full">
        {/*<label className="check-container inline">
            <input 
                className="inline"
                type="checkbox" 
                name={requirement} 
                value={reqNumber} 
                checked={isChecked} 
                onChange={handleOnChange}/>
              <IconLink label={requirement} />
        </label>*/}
        <h4><IconLink label={requirement} isLink={false} /></h4>
      </div>
        <div className="pt-3">
          {
            goldReqd &&
            <IconLink label={`${goldReqd}g`} altImgSrc="Gold" isLink={false}/>
          }
          {
            reqItems.map( (item) => (
              <IconLink 
                label={item.item} 
                qty={item.qty ? item.qty : undefined}
                isLink={false}
              />
            ))
          }
        </div>
    </article>
  );
}

export default SingleCheck;