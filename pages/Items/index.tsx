/**
 * MODULE:  pages/Items/index.tsx
 * 
 * SUMMARY:
 *   Displays links for each item.
 * 
 * API USAGE:
 *   - GET /api/items - retrieve items grouped by category
 * 
 * DEPENDENCIES:
 *   - next/head: for adding page title/metadata
 *   - next/link: for optimized links
 *   - react: for states and handling async behavior with useEffect
 *   - components/Loading: component to display while page is loading
 *   - types/items: TypeScript type for data retrieved from the API
 */

import Head from "next/head";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loading from "@/components/Loading";
import { ItemCategory } from "@/types/items";


export default function AllItemsPage() {

  const [itemGroups, setItemGroups] = useState<ItemCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const noSCategories = [
    "Fish", "Forage", "Artisan Goods", "Monster Loot", "Misc", "Cooking", "Trash"
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/../api/items');
        const data = await res.json();
        if(res.ok)
          setItemGroups(data);
      } 
      catch(error) {
        console.log('Error fetching documents');
      }
      finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  return (
    <>
      <Head>
        <title>Items | Stardew Guide</title>
      </Head>
      {
        loading ? (
          <Loading/>
        ) : (
          itemGroups.length > 0 ? (
            <main>
              <h1>Items</h1>
              {
                itemGroups.map( (category) => (
                  <div key={category._id} className="bottom-border py-3">
                    <h2>
                      { noSCategories.includes(category._id) ? category._id : `${category._id}s` }
                    </h2>
                    <div className="cards-container">
                      {
                        category.items.map( (itemName) => (
                          <Link 
                            key={itemName} 
                            className="cardlink itemlink card-tiny"
                            href={ `Items/${itemName.trim().replaceAll(" ", "_")}` }
                          >
                            <img 
                              className="itemphoto" 
                              src={`/${itemName.trim().replaceAll(" ", "_")}.png`} 
                              alt={`${itemName}`} 
                            />
                            <p>{itemName}</p>
                          </Link>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </main>
          ) : (
            <p data-testid='error-msg'>Oops! Items could not be retrieved.</p>
          )

        )
      }
    </>
  );

}// end AllItemsPage()