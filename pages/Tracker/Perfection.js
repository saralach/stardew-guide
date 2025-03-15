import IconLink from "@/components/IconLink";
import CheckCard from "@/components/CheckCard";
import CheckSection from "@/components/CheckSection";
import { CardWidth } from "@/types";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


export default function PerfectionTracker() {
  const [checkboxData, setCheckboxData] = useState([]);
  const { data: session, status } = useSession();
  const checkboxCategory = "Perfection";

  // Get initial checkbox data
  useEffect(() => {
      const fetchCheckboxData = async () => {
        if(status === "loading") {
          return; //session not yet loaded
        }
        try {
          if(session) {
            const res = await fetch(`/../api/getCheckboxData/${checkboxCategory}`);
            const data = await res.json();
            setCheckboxData(data);
            console.log(checkboxData);
            const result = checkboxData.find(item => item.checkbox_id === "EarthObelisk")
            console.log(result);
          }
          else {
            console.log("Error - user not authenticated")
          }
        } 
        catch(error) {
            console.log("Error fetching documents");
            console.log(error);
        }
      }
      fetchCheckboxData();
  }, [session, status]);


  // Handle any checkbox changes
  const handleCheckboxChange = async (isChecked, checkboxId) => {
    if(status === "authenticated") {
      const res = await fetch("/../api/saveCheckboxData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.accessToken}`
        },
        body: JSON.stringify({
          checkboxId: checkboxId,
          isChecked: isChecked,
          category: checkboxCategory
        }),
      });

      const data = res.json();
      if(!data.status === 200)
        console.log("Updated checkbox data not saved.");
    }
  }//end handleCheckboxChange()



  return (
    <main>
      <h1>Perfection Tracker</h1>

      <CheckSection sectionId="Items Shipped" 
          desc="Ship each item in the 'Items Shipped' collection.">

      </CheckSection>


      <CheckSection sectionId="Obelisks" 
          desc="Build the Earth, Water, Desert, and Island Obelisks.">

        <CheckCard task="Earth Obelisk" onChange={handleCheckboxChange} category="Obelisk" isChecked={checkboxData.find(item => item.checkbox_id === "EarthObelisk")?.is_checked ? "true" : "false"}>
          <IconLink label="500,000g" altImgSrc="Gold" isLink={false}/>
          <IconLink label="Iridium Bar" qty={10}/>
          <IconLink label="Earth Crystal" qty={10}/>
        </CheckCard>

        <CheckCard task="Water Obelisk" onChange={handleCheckboxChange} category="Obelisk" isChecked={checkboxData.find(item => item.checkbox_id === "WaterObelisk")?.is_checked ? "true" : "false"}>
          <IconLink label="Iridium Bar" qty={10}/>
          <IconLink label="Clam" qty={10}/>
          <IconLink label="Coral" qty={10}/>
        </CheckCard>

        <CheckCard task="Desert Obelisk" onChange={handleCheckboxChange} category="Obelisk" isChecked={checkboxData.find(item => item.checkbox_id === "DesertObelisk")?.is_checked ? "true" : "false"}>
          <IconLink label="1,000,000g" altImgSrc="Gold" isLink={false}/>
          <IconLink label="Iridium Bar" qty={20}/>
          <IconLink label="Coconut" qty={10}/>
          <IconLink label="Cactus Fruit" qty={10}/>
        </CheckCard>

        <CheckCard task="Island Obelisk" onChange={handleCheckboxChange} category="Obelisk" isChecked={checkboxData.find(item => item.checkbox_id === "IslandObelisk")?.is_checked ? "true" : "false"}>
          <IconLink label="1,000,000g" altImgSrc="Gold" isLink={false}/>
          <IconLink label="Iridium Bar" qty={10}/>
          <IconLink label="Dragon Tooth" qty={10}/>
          <IconLink label="Banana" qty={10}/>
        </CheckCard>

      </CheckSection>

      <CheckSection sectionId="Golden Clock" 
          desc="Build the Golden Clock on the Farm for 10,000,000g."/>

      <CheckSection sectionId="Monster Eradication" 
          desc="Complete all of the monster eradication goals in the Adventurer's Guild.">

      </CheckSection>

      <CheckSection sectionId="Max Hearts" 
          desc="Reach maximum hearts with every villager.">

      </CheckSection>

      <CheckSection sectionId="Level 10 Skills" 
          desc="Reach level 10 in all skills.">
        <CheckCard task="Mining Level 10" />
      </CheckSection>

      <CheckSection sectionId="Stardrops" 
          desc="Find all Stardrops.">
        <CheckCard cardWidth={CardWidth.Full} altId="FairStardrop" onChange={handleCheckboxChange}
          task="Buy at the Stardew Valley Fair."/>

        <CheckCard cardWidth={CardWidth.Full} altId="MinesStardrop" onChange={handleCheckboxChange} 
          task="Open the Treasure Chest on Floor 100 of The Mines."/>

        <CheckCard cardWidth={CardWidth.Full} altId="SpouseStardrop" onChange={handleCheckboxChange}  
          task="Reach 12.5 hearts with your spouse."/>

        <CheckCard cardWidth={CardWidth.Full} altId="KrobusStardrop" onChange={handleCheckboxChange}
          task="Buy from Krobus for 20,000g."/>

        <CheckCard cardWidth={CardWidth.Full} altId="BerryStardrop" onChange={handleCheckboxChange}
          task="In the Secret Woods, give Master Cannoli a Sweet Gem Berry."/>

        <CheckCard cardWidth={CardWidth.Full} altId="FishStardrop" onChange={handleCheckboxChange}
          task="Catch every fish (delivered in the mail the following day)."/>

        <CheckCard cardWidth={CardWidth.Full} altId="MuseumStardrop" onChange={handleCheckboxChange}
          task="Donate every mineral and artifact to the museum."/>
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