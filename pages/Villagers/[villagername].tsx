import Head from "next/head";
import IconLabel from "@/components/IconLabel";
import Loading from "@/components/Loading";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FullVillagerData } from "@/types/villagerInfoTypes";

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
            <main>
              <h1>{router.query.villagername}</h1>

              <div className="flex flex-col justify-center items-center flex-nowrap">
                <img 
                  className="villager-pic-lg block"
                  src={`/Villager/${router.query.villagername}.png`}
                />

                <table className="villagerinfo">
                  <tbody>
                    <tr>
                      <td className="labelcell">
                        Birthday
                      </td>
                      <td className="infocell">
                        {`${villagerInfo.bday_season} ${villagerInfo.bday_date}`}
                      </td>
                    </tr>
                    <tr>
                      <td className="labelcell">
                        Lives In
                      </td>
                      <td className="infocell">
                        {villagerInfo.home_location}
                      </td>
                    </tr>
                    <tr>
                      <td className="labelcell">
                        Address
                      </td>
                      <td className="infocell">
                        {villagerInfo.address}
                      </td>
                    </tr>
                    <tr>
                      <td className="labelcell">
                        Can Marry
                      </td>
                      <td className="infocell">
                        {villagerInfo.can_marry ? "Yes" : "No"}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <article className="py-5">
                  <h4>Loved Gifts</h4>
                  <ul>
                    {
                      villagerInfo.gift_prefs.items.map((gift, index) => {
                        return (
                          gift.pref_num === 5 && (
                            <li className="list-none h-fit" key={index}>
                              <IconLabel label={gift.item_name} isLink={true}/>
                            </li>
                          )
                        )
                      })
                    }
                  </ul>
                </article>
              </div>

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