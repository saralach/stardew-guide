/**
 * MODULE:  components/IconLabel
 * 
 * SUMMARY:
 *   Displays an icon inline with a label. Can also function as a link to another page.
 * 
 * DEPENDENCIES:
 *   - next/link: for optimized links
 *   - styles/IconLink: for styling
 * 
 * USED BY:
 *   Various pages and components
 * 
 */

import Link from 'next/link';
import styles from '@/styles/IconLink.module.css';

interface IconLabelProps {
    category?: string;      // subdirectory for img src
    label: string;          // text displayed
    qty?: number;           // qty to be displayed
    maxQty?: number;        // for displaying a qty range
    altImgSrc?: string;
    isLink?: boolean;   
    className?: string;
    iconSize?: string;
    qtyAfter?: boolean;     // determines whether qty is placed before or after label
    quality?: string;
}

export const ICON_SIZES = {
  XXS: styles.xxsicon,
  XS: styles.xsicon,
  SMALL: styles.smicon,
  MEDIUM: styles.mdicon,
  LARGE: styles.lgicon
}

function IconLabel({ category, label, qty, maxQty, altImgSrc = "", isLink = false, className = "", 
                     iconSize = ICON_SIZES.SMALL, qtyAfter=false, quality}: IconLabelProps)  {

                      console.log(`quality = ${quality}`)

  const itemName = getItemName(label, altImgSrc);
  const location = getLocation(itemName, category);
  const qualityPath = quality ? `/Quality/${quality}.png` : null;

  if(itemName === 'Gold')
    iconSize = ICON_SIZES.XS;

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
        <img 
          className={`${styles.iconimg} ${iconSize}`}
          src={`${location}.png`} alt={itemName}
        />
        {
          qualityPath && (
            <img 
              src={qualityPath}
              alt={`${quality} quality`}
              className={`${styles.qualityimg} ${iconSize}`}
            />
          )
        }
        {label}
      </Link>
    ) : (
      <div className={`${styles.iconlabel} ${className}`}>
        <img 
          className={`${styles.iconimg} ${iconSize}`}
          src={`${location}.png`} alt={itemName}
        />
        {
          qualityPath && (
            <img 
              src={qualityPath}
              alt={`${quality} quality`}
              className={`${styles.qualityimg} ${iconSize}`}
            />
          )
        }
        {label}
      </div>
    )
  );
} // end IconLabel

function getItemName(label: string, altImgSrc: string): string {
  let itemName = "";

  if(altImgSrc === "")
    itemName = label;
  else
    itemName = altImgSrc;
  
  itemName = itemName.trim();

  return itemName;
}

function getLocation(itemName: string, category: string | undefined): string {
  let location = "/" + itemName.replaceAll(" ", "_").replaceAll(":", "");

  if(typeof category !== 'undefined') {
    location = "/" + category.replaceAll(" ", "_") + location;
  }

  return location;
}

export default IconLabel;