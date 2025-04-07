import Head from 'next/head';
import styles from '@/styles/Item.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SourceSection from '@/components/SourceSection';
import { ItemInfo } from '@/types/itemInfoTypes';
import UsageSection from '@/components/UsageSection';

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
        console.log(data);
      } 
      catch(error) {
        console.log('Error fetching documents');
      }
      finally {
          setLoading(false);
          console.log('in finally');
      }
    }

    if(itemname)
      fetchItemInfo();

  }, [itemname]); /* executes when itemname is changed */

  // ==================== Return Page Content =====================
  return (
    <>
      <Head>
        <title>{`${item ? item.item_name : 'Item Not Found'} | Stardew Guide'`}</title>
      </Head>
      {
        item ? (
          <main>
            <div className={styles.itemintro}>
              <div className={styles.itemheader}>
                <img className='item-pic' alt={item.item_name} 
                  src={`/${itemname?.replace(' ', '_')}.png`} 
                />
                <h1 className='ps-2'>
                  {item.item_name}
                </h1>
              </div>
              <p className={styles.caption}>{item.desc}</p>
            </div>
    
            <section className={styles.btmborder} id='Sources'>
              <h2 className={`text-center pb-3`}>SOURCES</h2>
              {
                // Create a SourceSection for each source subcategory
                item.sources && item.sources?.map( (sourceCategory) => (
                  <SourceSection key={sourceCategory.source_category}
                      category={sourceCategory.source_category}
                      sources={sourceCategory.sources}
                      itemName={item.item_name}
                  />
                ))
              }
            </section>
            <section id='Usage'>
              <h2 className={`text-center pb-3`}>USAGE</h2>
              {
                // Create a SourceSection for each use subcategory
                item.uses && item.uses?.map( (useCategory) => (
                  <UsageSection key={useCategory.use_category}
                      category={useCategory.use_category}
                      uses={useCategory.uses}
                  />
                ))
              }
            </section>
          </main>
        ) : (
          <p>Oops, item not found.</p>
        )
      }
    </>
  );
}