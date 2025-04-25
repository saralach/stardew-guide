/**
 * MODULE:  components/Header
 * 
 * SUMMARY:
 *   The website's header / navigation.
 *
 * DEPENDENCIES:
 *   - next-auth/react: for sign-in and sign-out functionality and getting session
 *   - next/link: for optimized links
 *   - next/router: for navigation
 *   - styles/Header: for styling
 * 
 * USED BY:
 *   - pages/_app.jsx (base page layout)
 */

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/Header.module.css';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  
  const tabs = [
    { name: 'Villagers' },
    { name: 'Items' },
    { name: 'Tracker', subtabs: [ 'Bundles', 'Museum', 'Perfection' ] }
  ];

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
            ) : (
              <img className={styles.sitelogo} 
                   src='/stardew-guide-logo.png'
                   alt='Stardew Guide Logo'
              />
            )
          }
          <ul className={styles.navtabs}>
            {
              tabs.map((tab) => {
                const path = '/' + tab.name;
                
                if(tab.subtabs) {
                  return (
                    <li className={styles.dropdowncontainer}>
                      <span className={styles.dropdowntrigger}>{tab.name}</span>
                      <ul className={styles.dropdownlist}>
                        {
                          tab.subtabs.map((subtab) => {
                            const subpath = path + '/' + subtab;
                            return (
                              <li>
                                {
                                  router.pathname === subpath ? 
                                    subtab : <Link href={subpath}>{subtab}</Link>
                                }
                              </li>
                            )
                          })
                        }
                      </ul>
                    </li>
                  )
                }
                else {
                  return (
                    <li>
                      {
                        router.pathname !== path ? 
                          <Link href={path}>{tab.name}</Link> : tab.name
                      }
                    </li>
                  )
                }
              })
            }
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