/**
 * MODULE:  pages/Villagers/index.tsx
 * 
 * SUMMARY:
 *   Displays a link for each villager with their name and photo.
 * 
 * API USAGE:
 *   - GET /api/villagers - retrieve an array of all villager names
 * 
 * DEPENDENCIES:
 *   - next/head: for adding page title/metadata
 *   - react: for states and handling async behavior with useEffect
 *   - components/Loading: component to display while page is loading
 */

import Head from "next/head";
import { useEffect, useState } from 'react';
import Loading from "@/components/Loading";

export default function AllVillagersPage() {
  const [villagers, setVillagers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVillagers = async () => {
      try {
        const res = await fetch('/api/villagers');
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
  }, []); /* []: run only once after the component mounts */

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
                      <img
                        className="villagerphoto" src={`/Villager/${villager}.png`}
                        alt={`${villager}'s portrait`} 
                      />
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