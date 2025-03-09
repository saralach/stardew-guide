import styles from '../../styles/Item.module.css';
import IconLink from "../../components/IconLink";

export default function ItemPage() {


  return (
    <main>
      <div className={styles.itemintro}>
        <div className={styles.itemheader}>
          <img className="item-pic" src={`/Dinosaur_Egg.png`} alt={"Dinosaur Egg"} />
          <h1 className="ps-2">Dinosaur Egg</h1>
        </div>
        <p className={styles.caption}>
          “A giant dino egg... The entire shell is still intact!”
        </p>
        <div className={styles.itemheader}>
          <IconLink altImgSrc="Icons\Energy" label="125" className="pe-4" isLink={false}/>
          <IconLink altImgSrc="Icons\Health" label="56" className="pe-4" isLink={false}/>
          <IconLink altImgSrc="Gold" label="350g" className="pe-4" isLink={false}/>
        </div>
      </div>

      <section className={styles.btmborder} href="Sources">
        <h2>Sources</h2>
        <ul className={styles.multilevellist}>
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
        </ul>

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

      <section href="Usage">
        <h2>Usage</h2>
        <ul className={styles.multilevellist}>
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
        </ul>

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