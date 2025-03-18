import IconLink from "../../components/IconLink";

const goals = [
    {
        monsterType: "Slimes", 
        qty: 1000, 
        monsters: ["Slime"], 
        locations: ["The Mines", "Skull Cavern", "Quarry Mine", "Secret Woods", "Volcano Dungeon"] 
    },
    {
        monsterType: "Void Spirits", 
        qty: 150, 
        monsters: ["Shadow Shaman", "Shadow Brute"], 
        locations: ["The Mines (Floors 81-119)"] 
    },
    {
        monsterType: "Bats", 
        qty: 200, 
        monsters: ["Bat", "Frost Bat", "Lava Bat", "Iridium Bat"],
        locations: ["The Mines (Floors 31-119)", "Skull Cavern (Floors 20+)"]
    },
    {
        monsterType: "Skeletons", 
        qty: 50, 
        monsters: ["Skeleton"], 
        locations: ["The Mines (Floors 71-79)"] 
    },
    {
        monsterType: "Cave Insects", 
        qty: 80, 
        monsters: ["Bug", "Cave Fly", "Grub", "Mutant Fly", "Mutant Grub", "Armored Bug"], 
        locations: ["The Mines (Floor 1-39)", "Skull Cavern", "Mutant Bug Lair"] 
    },
    {monsterType: "Duggies", 
        qty: 30, 
        monsters: ["Duggy", "Magma Duggy"], 
        locations: ["The Mines (Floors 6-29)"]
    },
    {
        monsterType: "Dust Sprites", 
        qty: 500, 
        monsters: ["Dust Sprite"], 
        locations: ["The Mines (Floors 41-79)"]
    },
    {
        monsterType: "Rock Crabs", 
        qty: 60, 
        monsters: ["Rock Crab", "Lava Crab", "Iridium Crab"],
        locations: ["The Mines (Floors 1-29 and 81-119)", "Skull Cavern (Floors 26+)"]
    },
    {
        monsterType: "Mummies", 
        qty: 100, 
        monsters: ["Mummy"], 
        locations: ["Skull Cavern"] 
    },
    {
        monsterType: "Pepper Rex", 
        qty: 50, 
        monsters: ["Pepper Rex"], 
        locations: ["Skull Cavern"] 
    },
    {
        monsterType: "Serpents", 
        qty: 250, 
        monsters: ["Serpent"], 
        locations: ["Skull Cavern"] 
    },
    {
        monsterType: "Magma Sprites", 
        qty: 150, 
        monsters: ["Magma Sprite", "Magma Sparker"], 
        locations: ["Volcano Dungeon"] 
    }
 ];

export default function MonsterSlayerGoals() {

    return (
        <main>
            <h1>Monster Eradication Goals</h1>
            <section class="cards-container">
            {
                goals.map((goal) => {
                    return (
                        <div class="card thin-card">
                            <div class="check-container bottom-border">
                                <input type="checkbox" id={goal.monsterType} name={goal.monsterType} />
                                <label for={goal.monsterType}><h4>Slay {goal.qty} {goal.monsterType}</h4></label>
                            </div>
                            <h5>Qualifying Monsters</h5>
                            <ul class="monsterlist">
                                {
                                    goal.monsters.map((monster) => {
                                        return (
                                            <li>
                                                <IconLink section="Monsters" name={monster} isLink={false} />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <h5>Locations</h5> 
                            <ul>
                                {
                                    goal.locations.map((location) => {
                                        return (
                                            <li>{location}</li>
                                        )
                                    })
                                }
                            </ul>

                        </div>
                    );
                })
            }
            </section>
        </main>
    );
        
}



/*function Link({section, name}) {
    return (
        <a href={`${section}/${name}`}>
            <img src={`/${section}/${name.replace(" ", "_")}.png`} alt={name}/>
            {name}
        </a>
    );
}*/
