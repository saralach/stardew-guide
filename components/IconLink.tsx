import styles from '@/styles/IconLink.module.css';
import Link from 'next/link';

interface IconLinkProps {
    category?: string;
    label: string;
    qty?: number;
    altImgSrc?: string;
    isLink?: boolean;   
    className?: string;
    width?: string;
}

function IconLink({ category, label, qty, altImgSrc = "", isLink = true, className = "", width = "36px" }: IconLinkProps)  {
    if(label == undefined && altImgSrc == "") // Error
        return null;
    // --- Set name of item & item location --------
    let itemName = "";
    if(altImgSrc === "")
        itemName = label;
    else
        itemName = altImgSrc;
    
    itemName = itemName.trim();

    let location = "/" + itemName?.replaceAll(" ", "_").replaceAll(":", "");
    if(typeof category !== 'undefined')
        location = "/" + category + location;

    if(itemName === 'Gold')
      width="18px";

    // --- Add quantity to label, if given ---------
    if(qty !== undefined)
        label = qty + " " + label;

    return (
        isLink ? (
            <Link className={`${styles.iconlink} ${className} link`} href={`/Items${location}`}>
                <img className={styles.iconimg} width={width}
                    src={`${location}.png`} alt={itemName}/>
                {label}
            </Link>
        ) : (
            <div className={`${styles.iconlink} ${className}`}>
                <img className={styles.iconimg} width={width}
                    src={`${location}.png`} alt={itemName}/>
                {label}
            </div>
        )
    );
}

export default IconLink;