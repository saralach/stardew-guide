import styles from '@/styles/IconLink.module.css';
import Link from 'next/link';

interface IconLinkProps {
    category?: string;
    label: string;
    qty?: number;
    altImgSrc?: string;
    isLink?: boolean;   
    className?: string;
    iconSize?: string;
}

export const ICON_SIZES = {
  XXS: styles.xxsicon,
  XS: styles.xsicon,
  SMALL: styles.smicon,
  MEDIUM: styles.mdicon,
  LARGE: styles.lgicon
}

function IconLink({ category, label, qty, altImgSrc = "", isLink = true, className = "", iconSize = ICON_SIZES.SMALL }: IconLinkProps)  {

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
    location = "/" + category + location;

  if(itemName === 'Gold') {
    //width="18px";
    //widthStyle = styles.xsicon;
    iconSize = ICON_SIZES.XS;
  }

  // --- Add quantity to label, if given ---------
  if(qty !== undefined)
      label = qty + " " + label;

  return (
      isLink ? (
          <Link className={`${styles.iconlink} ${className} link`} href={`/Items${location}`}>
              <img className={`${styles.iconimg} ${iconSize/*widthStyle*/}`} /*width={width}*/
                  src={`${location}.png`} alt={itemName}/>
              {label}
          </Link>
      ) : (
          <div className={`${styles.iconlink} ${className}`}>
              <img className={`${styles.iconimg} ${iconSize/*widthStyle*/}`} /*width={width}*/
                  src={`${location}.png`} alt={itemName}/>
              {label}
          </div>
      )
  );
}

export default IconLink;