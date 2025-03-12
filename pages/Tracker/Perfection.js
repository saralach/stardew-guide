import CheckItem from "../components/CheckItem";
import IconLink from "../components/IconLink";
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PerfectionTracker() {

/*const DocumentsList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await fetch('/api/getDocuments?sortField=yourFieldName&sortOrder=asc'); // Modify the query params as needed
        const data = await res.json();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Documents</h1>
      <ul>
        {documents.map((doc, index) => (
          <li key={index}>{JSON.stringify(doc)}</li>
        ))}
      </ul>
    </div>
  );
};
export default DocumentsList;
*/



    return (
        <main>
            <h1>Perfection Tracker</h1>

            
            <section id="items-shipped" className="card">
                <div className="flex justify-between">
                    <label className="check-container">
                        <input 
                            type="checkbox" 
                            id={"shipped-collection-checkbox"} 
                            name={"shipped-collection"} 
                            value={"shipped-collection"} 
                            /*checked={"isChecked"} 
                            onChange={handleOnChange}*/ />
                        Ship each item in the 'Items Shipped' collection.
                    </label>
                    <ChevronDown className="inline"/>
                </div>
            </section>

            

            <section id="obelisks-built" className="card">
                <div className="flex justify-between">
                    <label className="check-container">
                        <input 
                            type="checkbox" 
                            id={"shipped-collection-checkbox"} 
                            name={"shipped-collection"} 
                            value={"Shipped Collection"} 
                            /*checked={"isChecked"} 
                            onChange={handleOnChange}*/ />
                        Build the Earth, Water, Desert, and Island Obelisks.
                    </label>
                    <ChevronUp className="inline"/>
                </div>

                <div className="subcards-container flex flex-row basis-lg">
                    <article id="earth-obelisk-card" className="card">
                        <label className="check-container bottom-border">
                            <input 
                                type="checkbox" 
                                id={"earth-obelisk-checkbox"} 
                                name={"earth-obelisk"} 
                                value={"Earth Obelisk"} 
                                /*checked={"isChecked"} 
                                onChange={handleOnChange}*//>
                                Earth Obelisk
                        </label>
                        <div className="pt-3">
                            <IconLink label="500,000g" altImgSrc="Gold" isLink={false}/>
                            <IconLink label="Iridium Bar" qty={10}/>
                            <IconLink label="Earth Crystal" qty={10}/>
                        </div>
                    </article>

                    <article id="water-obelisk-card" className="card">
                        <label className="check-container bottom-border">
                            <input 
                                type="checkbox" 
                                id={"water-obelisk-checkbox"} 
                                name={"water-obelisk"} 
                                value={"Water Obelisk"} 
                                /*checked={"isChecked"} 
                                onChange={handleOnChange}*//>
                                Water Obelisk
                        </label>
                        <div className="pt-3">
                            <IconLink label="500,000g" altImgSrc="Gold" isLink={false}/>
                            <IconLink label="Iridium Bar" qty={10}/>
                            <IconLink label="Clam" qty={10}/>
                            <IconLink label="Coral" qty={10}/>
                        </div>
                    </article>

                    <article id="desert-obelisk-card" className="card">
                        <label className="check-container bottom-border">
                            <input 
                                type="checkbox" 
                                id={"desert-obelisk-checkbox"} 
                                name={"desert-obelisk"} 
                                value={"Desert Obelisk"} 
                                /*checked={"isChecked"} 
                                onChange={handleOnChange}*/ />
                                Desert Obelisk
                        </label>
                        <div className="pt-3">
                            <IconLink label="1,000,000g" altImgSrc="Gold" isLink={false}/>
                            <IconLink label="Iridium Bar" qty={20}/>
                            <IconLink label="Coconut" qty={10}/>
                            <IconLink label="Cactus Fruit" qty={10}/>
                        </div>
                    </article>

                    <article id="desert-obelisk-card" className="card">
                        <label className="check-container bottom-border">
                            <input 
                                type="checkbox" 
                                id={"desert-obelisk-checkbox"} 
                                name={"desert-obelisk"} 
                                value={"Desert Obelisk"} 
                                /*checked={"isChecked"} 
                                onChange={handleOnChange}*/ />
                                Desert Obelisk
                        </label>
                        <div className="pt-3">
                            <IconLink label="1,000,000g" altImgSrc="Gold" isLink={false}/>
                            <IconLink label="Iridium Bar" qty={20}/>
                            <IconLink label="Coconut" qty={10}/>
                            <IconLink label="Cactus Fruit" qty={10}/>
                        </div>
                    </article>


                </div>

            </section>



            <section id="golden-clock" className="card">
                <div className="flex">
                    <label className="check-container pe-4">
                        <input 
                            type="checkbox" 
                            id={"golden-clock-checkbox"} 
                            name={"golden-clock"} 
                            value={"golden-clock"} 
                            /*checked={"isChecked"} 
                            onChange={handleOnChange}*/ />
                        Build the Golden Clock on the Farm.
                    </label>
                    <IconLink label="10,000,000g" altImgSrc="Gold" isLink={false}/>
                </div>
            </section>

            

            <section id="monster-slayer" className="card">
                <div className="flex justify-between">
                    <label className="check-container">
                        <input 
                            type="checkbox" 
                            id={"monster-slayer-checkbox"} 
                            name={"monster-slayer"} 
                            value={"monster-slayer"} 
                            /*checked={"isChecked"} 
                            onChange={handleOnChange}*/ />
                        Complete all of the monster eradication goals in the Adventurer's Guild.
                    </label>
                    <ChevronDown className="inline"/>
                </div>
            </section>



            <section id="great-friends" className="card">
                <div className="flex justify-between">
                    <label className="check-container">
                        <input 
                            type="checkbox" 
                            id={"great-friends-checkbox"} 
                            name={"great-friends"} 
                            value={"great-friends"} 
                            /*checked={"isChecked"} 
                            onChange={handleOnChange}*/ />
                        Reach maximum hearts with every villager.
                    </label>
                    <ChevronDown className="inline"/>
                </div>
            </section>



            <section id="farmer-level" className="card">
                <div className="flex justify-between">
                    <label className="check-container">
                        <input 
                            type="checkbox" 
                            id={"farmer-level-checkbox"} 
                            name={"farmer-level"} 
                            value={"farmer-level"} 
                            /*checked={"isChecked"} 
                            onChange={handleOnChange}*/ />
                        Reach level 10 in all skills.
                    </label>
                    <ChevronDown className="inline"/>
                </div>
            </section>


            
            <section id="stardrops-found" className="card">
                <div className="flex justify-between">
                    <label className="check-container">
                        <input 
                            type="checkbox" 
                            id={"stardrops-found-checkbox"} 
                            name={"stardrops-found"} 
                            value={"stardrops-found"} 
                            /*checked={"isChecked"} 
                            onChange={handleOnChange}*/ />
                        Find all Stardrops.
                    </label>
                    <ChevronDown className="inline"/>
                </div>
            </section>



            <section id="cooking-recipes" className="card">
                <div className="flex justify-between">
                    <label className="check-container">
                        <input 
                            type="checkbox" 
                            id={"cooking-recipes-checkbox"} 
                            name={"cooking-recipes"} 
                            value={"cooking-recipes"} 
                            /*checked={"isChecked"} 
                            onChange={handleOnChange}*/ />
                        Cook every recipe.
                    </label>
                    <ChevronDown className="inline"/>
                </div>
            </section>



            <section id="crafting-recipes" className="card">
                <div className="flex justify-between">
                    <label className="check-container">
                        <input 
                            type="checkbox" 
                            id={"crafting-recipes-checkbox"} 
                            name={"crafting-recipes"} 
                            value={"crafting-recipes"} 
                            /*checked={"isChecked"} 
                            onChange={handleOnChange}*/ />
                        Craft at least one of every item.
                    </label>
                    <ChevronDown className="inline"/>
                </div>
            </section>



            <section id="fish-caught" className="card">
                <div className="flex justify-between">
                    <label className="check-container">
                        <input 
                            type="checkbox" 
                            id={"fish-caught-checkbox"} 
                            name={"fish-caught"} 
                            value={"fish-caught"} 
                            /*checked={"isChecked"} 
                            onChange={handleOnChange}*/ />
                        Catch every fish.
                    </label>
                    <ChevronDown className="inline"/>
                </div>
            </section>



            <section id="walnuts-found" className="card">
                <div className="flex justify-between">
                    <label className="check-container">
                        <input 
                            type="checkbox" 
                            id={"walnuts-found-checkbox"} 
                            name={"walnuts-found"} 
                            value={"walnuts-found"} 
                            /*checked={"isChecked"} 
                            onChange={handleOnChange}*/ />
                        Collect all 130 Golden Walnuts on Ginger Island.
                    </label>
                    <ChevronDown className="inline"/>
                </div>
            </section>




        </main>
    );
}