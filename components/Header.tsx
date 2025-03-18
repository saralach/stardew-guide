import { Menu } from 'lucide-react';
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link'

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const { data: session } = useSession();

  const handleHamburgerClick = () => {
    setIsVisible(!isVisible);
  }

  return (
    <header>
      <nav>
        <div className="lefthead">
          <a href="/">
            <img id="site-logo" src="/stardew-guide-logo.png" alt="Stardew Guide Logo"/>
          </a>
          <button id="hamburgerbtn" onClick={handleHamburgerClick}>
            <Menu />
          </button>
          <div className={isVisible ? "blocktabs" : "navtabs"}>
            <Link className="tab" href="/Villagers">
              Villagers
            </Link>
            <Link className="tab" href="/Items">
              Items
            </Link>
            <Link className="tab" href="/Tracker">
              Trackers
            </Link>
          </div>
        </div>    
        {
          session ? (<button onClick={() => signOut()}>Sign out</button>
            ) : (<button onClick={() => signIn()}>Sign in</button>)
        }
                
      </nav>
    </header>
  );
}