import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import styles from '@/styles/Header.module.css';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className={styles.pagehead}>
      <nav>
        <div className={styles.lefthead}>
          {
            router.pathname !== '/' ? (
              <Link href='/'>
                <img className={styles.sitelogo} 
                     src='/stardew-guide-logo.png'
                     alt='Stardew Guide Logo'
                />
              </Link>
            ): (
              <img className={styles.sitelogo} 
                   src='/stardew-guide-logo.png'
                   alt='Stardew Guide Logo'
              />
            )
          }
          <ul className={styles.navtabs}>
            <li>
            { 
              router.pathname !== '/Villagers' ? (
                <Link href='/Villagers'>Villagers</Link>
              ) : (
                "Villagers"
              )
            }
            </li>
            <li>
            {
              router.pathname !== '/Items' ? (
                <Link href='/Items'>Items</Link>
              ) : (
                "Items"
              )
            }
            </li>
            <li>
            {
              router.pathname !== '/Tracker' ? (
                <Link href='/Tracker'>Trackers</Link>
              ) : (
                "Trackers"
              )
            }
            </li>
          </ul>
        </div>    
        {
          session ? (<button onClick={() => signOut()}>Sign out</button>
            ) : (<button onClick={() => signIn()}>Sign in</button>)
        }  
      </nav>
    </header>
  );
}