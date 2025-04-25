/**
 * MODULE:  pages/Villagers/[villagername].tsx
 * 
 * SUMMARY:
 *   Displays information for a single villager.
 * 
 * API USAGE:
 *   - GET /api/villagers/[villagername] - retrieve villager data
 * 
 * DEPENDENCIES:
 *   - next/head: for adding page title/metadata
 *   - next/router: for retrieving slug (aka [villagername]) from URL
 *   - react: for states and handling async behavior with useEffect
 *   - components/IconLabel: for displaying gifts in gift preferences section
 *   - components/Loading: component to display while page is loading
 *   - styles/Villager: styling
 *   - types/villagers: TypeScript type for data retrieved from the API
 */

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import IconLabel from '@/components/IconLabel';
import Loading from '@/components/Loading';
import styles from '@/styles/Villager.module.css';
import { FullVillagerData } from '@/types/villagers';


export default function VillagerPage() {
  const router = useRouter();
  const { villagername } = router.query;

  const [villagerInfo, setVillagerInfo] = useState<FullVillagerData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVillagerInfo = async () => {
      try {
        const res = await fetch(`/api/villagers/${villagername}`);
        const data = await res.json();
        if(res.ok)
          setVillagerInfo(data);
      } 
      catch(error) {
        console.log('Error fetching documents');
      }
      finally {
        setLoading(false);
      }
    }

    if(villagername)
      fetchVillagerInfo();
  }, [villagername]); /* executes again when villagername is changed */

  
  return (
    <div>
      <Head>
        <title>{`${router.query.villagername} | Stardew Guide`}</title>
      </Head>
      {
        loading ? (
          <Loading/>
        ) : (
          villagerInfo ? (
            <main className={styles.pgcontainer}>
              <h1>{router.query.villagername}</h1>
                <img 
                  className='villager-pic-lg block'
                  src={`/Villager/${router.query.villagername}.png`}
                />

                <table className='villagerinfo'>
                  <tbody>
                    <tr>
                      <td className='labelcell'>
                        Birthday
                      </td>
                      <td>
                        {`${villagerInfo.bday_season} ${villagerInfo.bday_date}`}
                      </td>
                    </tr>
                    <tr>
                      <td className='labelcell'>
                        Lives In
                      </td>
                      <td>
                        {villagerInfo.home_location}
                      </td>
                    </tr>
                    <tr>
                      <td className='labelcell'>
                        Address
                      </td>
                      <td>
                        {villagerInfo.address}
                      </td>
                    </tr>
                    <tr>
                      <td className='labelcell'>
                        Can Marry
                      </td>
                      <td>
                        {villagerInfo.can_marry ? 'Yes' : 'No'}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <section className={styles.giftsection}>
                  {
                    villagerInfo.gift_groups && (
                      <>
                        <h2>Gift Preferences</h2>
                        <div className={styles.prefscontainer}>
                          {
                            villagerInfo.gift_groups.map((giftGroup, groupIndex) => (
                              <div>
                                <h4>{`${giftGroup.pref} Gifts`}</h4>
                                <ul>
                                  {
                                    giftGroup.items.map((item, itemIndex) => (
                                      <li key={`${groupIndex}${itemIndex}`}>
                                        <IconLabel label={item} isLink={true}/>
                                      </li>
                                    ))
                                  }
                                </ul>
                              </div>
                            ))
                          }
                        </div>
                      </>
                    )
                  }
                </section>
            </main>
          ) : (
            <p data-testid='error-msg'>
              {`No villager found with the name '${router.query.villagername}'.`}
            </p>
          )
        )
      }
    </div>
  );
  
}// end VillagerPage()