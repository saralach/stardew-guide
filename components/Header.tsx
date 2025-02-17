


export default function Header() {
    return (
        <header>
            <nav>
                <div className="nav-tabs">
                    <a href="/">
                        <img id="site-logo" src="/stardew-guide-logo.png" alt="Stardew Guide Logo"/>
                    </a>
                    <a className="tab" href="/Villagers">
                        Villagers
                        </a>
                    <a className="tab" href="/Items">
                        Items
                    </a>
                    <a className="tab" href="/Tracker">
                        Perfection Tracker
                    </a>
                </div>

                <a className="tab" href="/login">Sign In</a>
            </nav>
        </header>
    );
}