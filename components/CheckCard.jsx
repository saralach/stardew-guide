import { useState } from "react";


export default function CheckCard({ name, children }) {
  const noSpaceName = name.replace(" ", "");

  return (
    <article className="card">
      <div className="bottom-border">
        <label>
          <input 
            type="checkbox" 
            id={`${noSpaceName}Checkbox`} 
            name={noSpaceName} 
            value={name} 
            /*checked={"isChecked"} 
            onChange={handleOnChange}*//>
            {name}
        </label>
      </div>
      <div className="pt-3">
      {
        children
        /*<IconLink label="500,000g" altImgSrc="Gold" isLink={false}/>
        <IconLink label="Iridium Bar" qty={10}/>
        <IconLink label="Earth Crystal" qty={10}/>*/
      }
      </div>
    </article>
  );
}







/*
interface CheckItemProps {
  content: string;
  inputId: string;
}

export default function CheckItem({ content, inputId }: CheckItemProps)  {
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
*/