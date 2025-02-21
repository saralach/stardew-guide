interface IconLinkProps {
    category?: string;
    label: string;
    qty?: number;
    altImgSrc?: string;
    isLink?: boolean;
    width?: string;
}

function IconLink({ category, label, qty, altImgSrc = "", isLink = true, width = "36px" }: IconLinkProps)  {
    // --- Set name of item & item location --------
    let itemName = "";
    if(altImgSrc === "")
        itemName = label;
    else
        itemName = altImgSrc;

    let location = "/" + itemName.replace(" ", "_");
    if(typeof category !== 'undefined')
        location = "/" + category + location;

    // --- Add quantity to label, if given ---------
    if(qty !== undefined)
        label = qty + " " + label;

    return (
        isLink ? (
            <a className="icon-link" href={location}>
                <img className="iconimg inline" width={width} /*width="36px"*/ 
                    src={`${location}.png`} alt={itemName}/>
                {label}
            </a>
        ) : (
            <div className="icon-link">
                <img className="iconimg inline" width={width} /*width="36px"*/ 
                    src={`${location}.png`} alt={itemName}/>
                {label}
            </div>
        )
    );
}

export default IconLink;