import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import NavigationCard from "@/components/NavigationCard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Stardew Guide</title>
        <meta name="description" content="Find the information you need about the villagers and items that Stardew Valley has to offer, and track your game progress using our Museum and Perfection trackers." />
      </Head>


      <main className={styles.homecontent}>
        <h1>Welcome to Stardew Guide!</h1>


        <section id="features">
          <h2>What does Stardew Guide have to offer?</h2>
          <p>Stardew Guide has all the tools and information you need, including:</p>
          <ul>
            <li>A wealth of information about the villagers and items in the game</li>
            <li>Museum and Perfection Trackers to keep track of your progress</li>
          </ul>
        </section>


        <section id="links">
          <h2>New to Stardew Guide?</h2>
          <p>
            Check out all that we have to offer below.
          </p>

          <div className={styles.imglinkscontainer}>
            <NavigationCard
              href="/Villagers"
              pageType="INFO"
              label="Villagers"
              imgSrc="/Villager/Alex.png"
              imgAlt="Portrait of Villager Alex"
              imgWidth={128} // intrinsic size = 128 x 128
            />
            <NavigationCard
              href="/Items"
              pageType="INFO"
              label="Items"
              imgSrc="/Prismatic_Shard.png"
              imgAlt="Prismatic Shard Item"
              imgWidth={96} // intrinsic size = 48 x 48; 48 * 2 = 96
            />
            <NavigationCard
              href="/Tracker/Perfection"
              pageType="TRACKER"
              label="Perfection"
              imgSrc="/Buildings/Gold_Clock.png"
              imgAlt="Golden Clock"
              imgWidth={72} // intrinsic size = 144; 144 / 2 = 72
              imgHeight={120} //intrinsic size = 240; 240 / 2 = 120
            />
            <NavigationCard
              href="/Tracker/Museum"
              pageType="TRACKER"
              label="Museum"
              imgSrc="/NPC/Gunther.png"
              imgAlt="Portrait of Museum Curator Gunther"
              imgWidth={128} // intrinsic size = 128 x 128
            />
          </div>
        </section>


        <section id="disclaimer">
          <h2>Disclaimer</h2>
          <p>
            The creator of Stardew Guide did not create Stardew Valley. The game as well as the
            artwork that can be found on this site are the work of ConcernedApe.
          </p>

          <p>
            If you haven't already, check out the game here:
          </p>
          <a 
            className={styles.gamelinkbtn} 
            href="https://store.steampowered.com/app/413150/Stardew_Valley/"
          >
            <Image
              src="/steam_icon_white.svg"
              alt="Steam Logo"
              width={32}
              height={32}
            />
            Stardew Valley on Steam
          </a>
          <a 
            className={styles.gamelinkbtn} 
            href="https://www.nintendo.com/us/store/products/stardew-valley-switch/"
          >
            <Image
              src="/nintendo_switch_icon_white.svg"
              alt="Nintendo Switch Logo"
              width={32}
              height={32}
            />
            Stardew Valley for Nintendo Switch
          </a>
        </section>


      </main>
    </>
  );
}
