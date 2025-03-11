import styles from '../../styles/Item.module.css';
import IconLink from "../../components/IconLink";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SourceSection from '../../components/SourceSection';

export default function ItemPage() {
  const router = useRouter();
  const { itemname } = router.query;

  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);

  // =================== Get Info from Database ===================
  useEffect(() => {
    const fetchItemInfo = async () => {
      try {
          const res = await fetch(`/api/items/${itemname}`);
          const data = await res.json();
          setItem(data);
      } 
      catch(error) {
          console.log('Error fetching documents');
      }
      finally {
          setLoading(false);
          console.log("in finally");
      }
      }

      if(itemname) {
        console.log("got item name, fetching data");
        fetchItemInfo();
      }
  }, [itemname]); /* executes again when itemname is changed */


  return (
    <main>
      <div className={styles.itemintro}>
        <div className={styles.itemheader}>
          <img className="item-pic" alt={item.item_name} 
            src={`/${itemname?.replace(" ", "_")}.png`} 
          />
          <h1 className="ps-2">
            {item.item_name}
          </h1>
        </div>
        <p className={styles.caption}>
          {item.desc}
        </p>
        {/*
        <div className={styles.itemheader}>
          {
            item.energy && <IconLink altImgSrc="Icon\Energy" label={item.energy} className="pe-4" 
            isLink={false}/>
          }
          {
            item.health && <IconLink altImgSrc="Icon\Health" label={item.health} className="pe-4" isLink={false}/>
          }
          {
            item.sell_price && <IconLink altImgSrc="Gold" label={`${item.sell_price}g`} 
              className="pe-4" isLink={false}/>
          }
        </div>
        */}

      </div>

      <section className={styles.btmborder} href="Sources">
        <h2 className={`text-center pb-3`}>SOURCES</h2>
        {
          // Create a SourceSection for each source array
          item.sources && Object.entries(item.sources).map( ([key, value]) => (
            <SourceSection key={key} category={key} sources={value} itemName={item.item_name}/>
          ))
        }







      {
        /*<ul className={styles.multilevellist}>
        <li>
            Farm Animals
            <ul>
              <li>Dinosaur</li>
            </ul>
          </li>
          <li>
            Monster Drops
            <ul>
              <li>Pepper Rex</li>
            </ul>
          </li>
          <li>
            Artifact Spots
            <ul>
              <li>The Mountains (0.6%)</li>
              <li>The Quarry (0.6%)</li>
            </ul>
          </li>
          <li>
            Fishing Treasure Chests (0.7%)
          </li>
          <li>
            Foraging
            <ul>
              <li>Skull Cavern</li>
            </ul>
          </li>
          <li>
            Crafting
          </li>
          <li>
            Geodes
            <ul>
              <li>Geode Type</li>
            </ul>
          </li>
          <li>
            Fishing
            <ul>
              <li>Location, Season, Weather</li>
            </ul>
          </li>
          <li>
            Farming
            <ul>
              <li>Seed Type, Season?</li>
            </ul>
          </li>
        </ul>*/
        }

        {/*
          <h2>Sources</h2>
          <ul>
            <li>Farm Animals (Dinosaurs)</li>
            <li>Monster Drops (Pepper Rex)</li>
            <li>Artifact Spots (The Mountains, The Quarry)</li>
            <li>Fishing Treasure Chests</li>
            <li>Foraging (Skull Cavern)</li>
          </ul>
        */
      }
      </section>

      <section href="Usage">
        <h2>Usage</h2>
        {/*<ul className={styles.multilevellist}>
        <li>
            Cooking
            <ul>
              <li>Recipe Name</li>
            </ul>
          </li>
          <li>
            Crafting
            <ul>
              <li>Recipe Name</li>
            </ul>
          </li>
          <li>
            Community Center
            <ul>
              <li>Bundle Name</li>
              <li>Bundle Name</li>
            </ul>
          </li>
          <li>
            Loved Gifts
            <ul>
              <li>Villager Name</li>
            </ul>
          </li>
          <li>
            Artisan Goods
            <ul>
              <li>Artisan Good</li>
            </ul>
          </li>
          <li>
            Smelting
            <ul>
              <li>Product</li>
            </ul>
          </li>
        </ul>*/}

        {/*
          <h2>Sources</h2>
          <ul>
            <li>Farm Animals (Dinosaurs)</li>
            <li>Monster Drops (Pepper Rex)</li>
            <li>Artifact Spots (The Mountains, The Quarry)</li>
            <li>Fishing Treasure Chests</li>
            <li>Foraging (Skull Cavern)</li>
          </ul>
        */}
      </section>



    </main>
  );
}