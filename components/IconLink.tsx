import "@/styles/iconlink.module.css";

interface IconLinkProps {
    section: string;
    name: string;
    isLink?: boolean;
}

function IconLink({ section, name, isLink = true }: IconLinkProps)  {
    return (
        isLink ? (
            <a href={`${section}/${name}`}>
            <img className="iconimg inline" width="36px" src={`/${section}/${name.replace(" ", "_")}.png`} alt={name}/>
            {name}
        </a>
        ) : (
            <div>
            <img className="iconimg inline" width="36px" src={`/${section}/${name.replace(" ", "_")}.png`} alt={name}/>
            {name}
        </div>
        )

    );
}

export default IconLink;