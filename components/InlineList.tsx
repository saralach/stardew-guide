import styles from '@/styles/InlineList.module.css';
import IconLink, { ICON_SIZES } from '@/components/IconLink';

type DelimiterTypes = "none" | "bullet";

interface InlineListProps {
  listItems: string[];
  listName: string;
  showIcons?: boolean;
  delimiter?: DelimiterTypes;
}

function InlineList({ listItems, listName = "", showIcons = false,  delimiter = "none"}: InlineListProps) {

  const delimiterStyle = delimiter === "bullet" ? styles.bullet : styles.none;

  const List = ({listItems}: {listItems: string[]}) => {
    return (
      <ul className={`${styles.inlinelist} ${delimiterStyle}`}>
        {
          listItems.map((listItem) => {
            return (
              showIcons ? <li><IconLink label={listItem} isLink={false} category={listName} iconSize={ICON_SIZES.XS}/></li> : <li>{listItem}</li>
            )
          })
        }
      </ul>
    )
  }

  if(listName === "") {
    return <List listItems={listItems}/>
  }
  
  return (
    <div className={styles.listcontainer}>
      <h6 className="xxs-font">{listName}</h6>
      <List listItems={listItems} />
    </div>

  );
}



export default InlineList;