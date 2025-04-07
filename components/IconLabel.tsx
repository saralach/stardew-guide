import styles from '@/styles/IconLink.module.css';
import Link from 'next/link';

interface IconLabelProps {
    category?: string;
    label: string;
    qty?: number;
    maxQty?: number;
    altImgSrc?: string;
    isLink?: boolean;   
    className?: string;
    iconSize?: string;
    qtyAfter?: boolean;
}

export const ICON_SIZES = {
  XXS: styles.xxsicon,
  XS: styles.xsicon,
  SMALL: styles.smicon,
  MEDIUM: styles.mdicon,
  LARGE: styles.lgicon
}

function IconLabel({ category, label, qty, maxQty, altImgSrc = "", isLink = false, className = "", 
                     iconSize = ICON_SIZES.SMALL, qtyAfter=false}: IconLabelProps)  {

  if(label == undefined && altImgSrc == "") // Error
    return null;

  // --- Set name of item & item location --------

  //let widthStyle = styles.smicon;
  let itemName = "";

  if(altImgSrc === "")
    itemName = label;
  else
    itemName = altImgSrc;
  
  itemName = itemName.trim();

  let location = "/" + itemName?.replaceAll(" ", "_").replaceAll(":", "");
  if(typeof category !== 'undefined')
    location = "/" + category.replaceAll(" ", "_") + location;

  if(itemName === 'Gold') {
    //width="18px";
    //widthStyle = styles.xsicon;
    iconSize = ICON_SIZES.XS;
  }

  // --- Add quantity to label, if given ---------
  if(qty !== undefined) {
    const qtyStr = maxQty ? `${qty}-${maxQty}` : qty.toString();
    if(qtyAfter)
      label = `${label} (${qtyStr})`;
    else
      label = `${qtyStr} ${label}`;
  }

  return (
      isLink ? (
          <Link className={`${styles.iconlabel} ${className} link`} href={`/Items${location}`}>
              <img className={`${styles.iconimg} ${iconSize}`}
                  src={`${location}.png`} alt={itemName}/>
              {label}
          </Link>
      ) : (
          <div className={`${styles.iconlabel} ${className}`}>
              <img className={`${styles.iconimg} ${iconSize}`}
                  src={`${location}.png`} alt={itemName}/>
              {label}
          </div>
      )
  );
}

export default IconLabel;