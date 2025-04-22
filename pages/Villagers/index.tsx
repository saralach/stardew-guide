import Head from "next/head";
import Loading from "@/components/Loading";
import { useEffect, useState } from 'react';
import { BasicVillagerData } from "@/types/villagerInfoTypes";

export default function AllVillagersPage() {

  const [villagers, setVillagers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVillagers = async () => {
      try {
        const res = await fetch('/../api/villagers');
        const data = await res.json();
        if(res.ok)
          setVillagers(data);
      } 
      catch(error) {
        console.log('Error fetching documents');
      }
      finally {
        setLoading(false);
      }
    }
    fetchVillagers();
  }, []);

  return (
    <>
      <Head>
        <title>Villagers | Stardew Guide</title>
      </Head>
      {
        loading ? (
          <Loading/>
        ) : (
          villagers.length > 0 ? (
            <main>
              <h1>Villagers</h1>
              <div className="cards-container">
                {
                  villagers.map( (villager) => (
                    <a className="cardlink villagerlink" href={`Villagers/${villager}`}>
                      <img className="villagerphoto" src={`/Villager/${villager}.png`} alt={`${villager}'s portrait`} />
                      <p>{villager}</p>
                    </a>
                  ))
                }
              </div>
            </main>
          ) : (
            <p data-testid='error-msg'>Oops! Villagers could not be retrieved.</p>
          )

        )
      }
    </>

  );

}// end AllVillagersPage()