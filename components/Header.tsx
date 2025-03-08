import { Menu } from 'lucide-react';
import { useState } from 'react';
import { useSession } from "next-auth/react";

export default function Header() {
    const [isVisible, setIsVisible] = useState(true);

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
                    <button id="hamburgerbtn" 
                            onClick={handleHamburgerClick}>
                        <Menu />
                    </button>
                    <div className={isVisible ? "blocktabs" : "navtabs"}>
                        <a  href="/Villagers">
                            Villagers
                            </a>
                        <a className="tab" href="/Items">
                            Items
                        </a>
                        <a className="tab" href="/Perfection_Tracker">
                            Perfection Tracker
                        </a>
                    </div>
                </div>

                <a id="logintab" className="tab" href="/Login">
                    Sign In
                </a>





            </nav>
        </header>
    );
}