import CheckCard from "@/components/CheckCard";
import IconLink from "@/components/IconLink";
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import CheckSection from "@/components/CheckSection";

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

      <CheckSection sectionId="Items Shipped" 
          desc="Ship each item in the 'Items Shipped' collection.">

      </CheckSection>


      <CheckSection sectionId="Obelisks" 
          desc="Build the Earth, Water, Desert, and Island Obelisks.">

        <CheckCard name="Earth Obelisk">
          <IconLink label="500,000g" altImgSrc="Gold" isLink={false}/>
          <IconLink label="Iridium Bar" qty={10}/>
          <IconLink label="Earth Crystal" qty={10}/>
        </CheckCard>

        <CheckCard name="Water Obelisk">
          <IconLink label="Iridium Bar" qty={10}/>
          <IconLink label="Clam" qty={10}/>
          <IconLink label="Coral" qty={10}/>
        </CheckCard>

        <CheckCard name="Desert Obelisk">
          <IconLink label="1,000,000g" altImgSrc="Gold" isLink={false}/>
          <IconLink label="Iridium Bar" qty={20}/>
          <IconLink label="Coconut" qty={10}/>
          <IconLink label="Cactus Fruit" qty={10}/>
        </CheckCard>

        <CheckCard name="Island Obelisk">
          <IconLink label="1,000,000g" altImgSrc="Gold" isLink={false}/>
          <IconLink label="Iridium Bar" qty={10}/>
          <IconLink label="Dragon Tooth" qty={10}/>
          <IconLink label="Banana" qty={10}/>
        </CheckCard>

      </CheckSection>

      <CheckSection sectionId="Golden Clock" 
          desc="Build the Golden Clock on the Farm.">
        <IconLink label="10,000,000g" altImgSrc="Gold" isLink={false} className="ms-8" />
      </CheckSection>

      <CheckSection sectionId="Monster Eradication" 
          desc="Complete all of the monster eradication goals in the Adventurer's Guild.">

      </CheckSection>

      <CheckSection sectionId="Max Hearts" 
          desc="Reach maximum hearts with every villager.">

      </CheckSection>

      <CheckSection sectionId="Level 10 Skills" 
          desc="Reach level 10 in all skills.">

      </CheckSection>

      <CheckSection sectionId="Stardrops" 
          desc="Find all Stardrops.">

      </CheckSection>

      <CheckSection sectionId="Stardrops" 
          desc="Find all Stardrops.">

      </CheckSection>

      <CheckSection sectionId="Cooking" 
          desc="Cook every recipe.">

      </CheckSection>

      <CheckSection sectionId="Crafting" 
          desc="Craft at least one of every item.">

      </CheckSection>

      <CheckSection sectionId="Fishing" 
          desc="Catch every fish.">

      </CheckSection>

      <CheckSection sectionId="Golden Walnuts" 
          desc="Collect all 130 Golden Walnuts on Ginger Island.">
        
      </CheckSection>

      {
      /*<section id="golden-clock" className="card">
        <div className="flex">
          <label className="check-container pe-4">
            <input 
              type="checkbox" 
              id={"golden-clock-checkbox"} 
              name={"golden-clock"} 
              value={"golden-clock"} />
            Build the Golden Clock on the Farm.
          </label>
          <IconLink label="10,000,000g" altImgSrc="Gold" isLink={false}/>
        </div>
      </section>*/
      }


    </main>
  );
}