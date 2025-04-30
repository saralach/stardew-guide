/**
 * MODULE:  components/InlineList
 * 
 * SUMMARY:
 *   Displays an icon inline with a label. Can also function as a link to another page.
 * 
 * DEPENDENCIES:
 *   - components/IconLabel: for displaying items with icons
 *   - styles/InlineList: for styling
 * 
 * USED BY:
 *   - components/CheckCard
 *   - components/SourceSection
 *   - components/UsageSection
 */

import IconLabel, { ICON_SIZES } from '@/components/IconLabel';
import styles from '@/styles/InlineList.module.css';

type DelimiterTypes = "none" | "bullet";

interface InlineListProps {
  listItems: string[];
  listName?: string;
  showIcons?: boolean;
  delimiter?: DelimiterTypes;
}

function InlineList({ listItems, listName = "", showIcons = false,  delimiter = "none"}: InlineListProps) {
  if(listItems === undefined) return;

  const delimiterStyle = delimiter === "bullet" ? styles.bullet : styles.none;

  const List = ({listItems}: {listItems: string[]}) => {
    return (
      <ul className={`${styles.inlinelist} ${delimiterStyle}`}>
        {
          listItems.map((listItem) => {
            return (
              <li key={listItem}>
                {
                  showIcons ? (
                    <IconLabel 
                      label={listItem} 
                      category={listName} 
                      iconSize={ICON_SIZES.XS}
                    />
                  ) : (
                    listItem
                  )
                }
              </li>
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