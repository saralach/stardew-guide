/**
 * MODULE:  pages/Items/[itemname].tsx
 * 
 * SUMMARY:
 *   Displays information for a single item.
 * 
 * API USAGE:
 *   - GET /api/items/[itemname] - retrieve the item's data
 * 
 * DEPENDENCIES:
 *   - next/head: for adding page title/metadata
 *   - next/router: for retrieving slug (aka [itemname]) from URL
 *   - react: for states and handling async behavior with useEffect
 *   - components/SourceSection: for displaying a group of item sources
 *   - components/UsageSection: for displaying a group of item usage
 *   - styles/Item: for styling
 *   - types/items: TypeScript type for data retrieved from the API
 */

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SourceSection from '@/components/SourceSection';
import UsageSection from '@/components/UsageSection';
import styles from '@/styles/Item.module.css';
import { ItemInfo } from '@/types/items';
import IconLabel from '@/components/IconLabel';


export default function ItemPage() {
  const router = useRouter();
  const { itemname } = Array.isArray(router.query) ? router.query[0] : router.query;
  const [item, setItem] = useState<ItemInfo>();
  const [loading, setLoading] = useState(true);

  // =================== Get Info from Database ===================
  useEffect(() => {
    const fetchItemInfo = async () => {
      try {
        const res = await fetch(`/api/items/${itemname}`);
        const data = await res.json();
        if(res.ok)
          setItem(data);
      } 
      catch(error) {
        console.log('Error fetching documents');
      }
      finally {
        setLoading(false);
      }
    }

    if(itemname)
      fetchItemInfo();

  }, [itemname]); /* executes when itemname is changed */

  // ==================== Return Page Content =====================
  return (
    <>
      <Head>
        <title>{`${item ? item.item_name : 'Item Not Found'} | Stardew Guide`}</title>
      </Head>
      {
        item ? (
          <main>
            <div className={styles.itemintro}>
              <div className={styles.itemheader}>
                <img className='item-pic' alt={item.item_name} 
                  src={`/${itemname?.replace(' ', '_')}.png`} 
                />
                <h1 className='ps-2'>{item.item_name}</h1>
              </div>
              <p className={styles.caption}>{item.desc}</p>

              <div className={styles.detailcontainer}>
                { /* ======== Energy & Health ======== */
                  (item.energy || item.health) && (
                    <>
                      <IconLabel
                        label={item.energy ? item.energy.toString() : "0"}
                        category='Icon'
                        altImgSrc='Energy'
                      />
                      <IconLabel
                        label={item.health ? item.health.toString() : "0"}
                        category='Icon'
                        altImgSrc='Health'
                      />
                    </>
                  )
                }
                { /* ========== Sell Price ========== */
                  item.sell_price && (
                    <IconLabel
                      label={`${item.sell_price}g`}
                      altImgSrc='Gold'
                    />
                  )
                }
              </div>
            </div>

            { /* =========== Item Sources =========== */
              item.sources && (
                <section className={styles.btmborder} id='Sources'>
                  <h2 className={`text-center pb-3`}>SOURCES</h2>
                  {
                    /* Create a SourceSection for each source subcategory */
                    item.sources && item.sources?.map( (sourceCategory) => (
                      <SourceSection 
                        key={`${sourceCategory.source_category}-Sources`}
                        category={sourceCategory.source_category}
                        sources={sourceCategory.sources}
                        itemName={item.item_name}
                      />
                    ))
                  }
                </section>
              )
            }

            { /* ============ Item Usage ============ */
              item.uses && (
                <section id='Usage'>
                  <h2 className={`text-center pb-3`}>USAGE</h2>
                  {
                    /* Create a SourceSection for each use subcategory */
                    item.uses?.map( (useCategory) => (
                      <UsageSection 
                        key={`${useCategory.use_category}-Sources`}
                        category={useCategory.use_category}
                        uses={useCategory.uses}
                      />
                    ))
                  }
                </section>
              )
            }
            
          </main>
        ) : (
          <p data-testid='error-msg'>{`Oops! Item '${itemname}' was not found.`}</p>
        )
      }
    </>
  );
}