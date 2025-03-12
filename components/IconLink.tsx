import styles from '@/styles/IconLink.module.css';

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

    let location = "/" + itemName?.replaceAll(" ", "_");
    if(typeof category !== 'undefined')
        location = "/" + category + location;

    if(itemName === 'Gold')
      width="18px";

    // --- Add quantity to label, if given ---------
    if(qty !== undefined)
        label = qty + " " + label;

    return (
        isLink ? (
            <a className={`${styles.iconlink} ${className}`} href={location}>
                <img className={styles.iconimg} width={width} /*width="36px"*/ 
                    src={`${location}.png`} alt={itemName}/>
                {label}
            </a>
        ) : (
            <div className={`${styles.iconlink} ${className}`}>
                <img className={styles.iconimg} width={width} /*width="36px"*/ 
                    src={`${location}.png`} alt={itemName}/>
                {label}
            </div>
        )
    );
}

export default IconLink;