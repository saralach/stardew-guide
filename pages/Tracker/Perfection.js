import Head from "next/head";
import IconLink from "@/components/IconLink";
import CheckCard from "@/components/CheckCard";
import CheckSection from "@/components/CheckSection";
import Loading from "@/components/Loading";
import InlineList from "@/components/InlineList";
import { CardWidth } from "@/types";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";



export default function PerfectionTracker() {
  const [isLoading, setIsLoading] = useState(true);
  const [requirements, setRequirements] = useState([]);
  const [checkboxData, setCheckboxData] = useState([]);
  const { data: session, status } = useSession();
  const checkboxCategory = "Perfection";
  const reqIconLabelSections = [
    'Items Shipped', 'Monster Slayer','Great Friends', 'Level 10 Skills', 'Cooking', 
    'Crafting', 'Fishing'
  ];

  const getCheckedStatus = (checkboxId) => {
    return checkboxData.find((item) => item.checkbox_id === checkboxId)?.is_checked ? true : false;
  }


  // ============ Fetch requirement data from database ============
  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const res = await fetch('/../api/getPerfectionReqs');
        const data = await res.json();
        console.log("requirements:");
        console.log(data);
        setRequirements(data);
      } 
      catch(error) {
        console.log('Error fetching documents');
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchRequirements();
  }, []);


  // ================= Get initial checkbox data ==================
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
            console.log("checkboxData has been set.");
          }
          else {
            console.log("Error - user not authenticated")
          }
        } 
        catch(error) {
            console.log("Error fetching documents");
            console.log(error);
        }
        finally {
          setIsLoading(false);
        }
      }
      fetchCheckboxData();
  }, [session, status]);


  // ================== Handle checkbox changes ===================
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
  

  // =================== Create Checkbox Cards ====================
  function PerfectionCard({subcategory, subcategoryId, req}) {
    let cardWidth = CardWidth.Wide;
    let showGold = false;
    let showIcons = false;
    let taskLabel = req.label ? req.label : req.req_id;
    let iconSrc;
    let formattedGold;
    let children = [];

    // ----- Format gold amount (add commas) ---------------------
    if(req.gold_reqd)
      formattedGold = `${req.gold_reqd.toLocaleString('en-US')}g`;

    // ----- Determine how to display based on subcategory -------
    if(reqIconLabelSections.includes(subcategory)) {
      showIcons=true;
      if(req.icon_name)
        iconSrc = req.icon_name.trim().replace(" ", "_");
    }

    if(subcategory === "Obelisks") {
      if(req.gold_reqd)
        showGold = true;
    }

    else if(subcategory === "Stardrops") {
      cardWidth = CardWidth.Full;
      if(req.gold_reqd)
        taskLabel += ` (${formattedGold})`;
    }

    else if(subcategory === "Monster Slayer") {
      if(req.icon_name)
        iconSrc = `Monster/${iconSrc}`;
    }

    // ----- Create child components -----------------------------
    if(subcategory === "Fishing") {
      if(req.seasons) {
        children.push(
          <InlineList listItems={req.seasons} listName="Seasons" showIcons={true} />
        );
      }

      if(req.weather && req.weather[0] !== "Any") {
        children.push(
          <InlineList listItems={req.weather} listName="Weather" showIcons={true} />
        );
      }
      
      if(req.times) {
        children.push(
          <InlineList listItems={req.times} listName="Time" delimiter="bullet" />
        );
      }

      if(req.locations) {
        children.push(
          <InlineList listItems={req.locations} listName="Locations" delimiter="bullet" />
        );
      }


    }

    if(showGold)
      children.push(<IconLink label={`${req.gold_reqd}g`} altImgSrc="Gold" isLink={false} />);
    
    if(req.items_reqd) {
      children.push(
        req.items_reqd.map((item_reqd) => {
          return <IconLink key={item_reqd.item} label={item_reqd.item} qty={item_reqd.qty} />
        })
      );
    }

    // ----- Return CheckCard Component --------------------------
    return (
      <CheckCard key={`${subcategory}-${req.id_num}`} 
          task={taskLabel} 
          altId={req.label && req.req_id} 
          onChange={handleCheckboxChange} 
          isChecked={checkboxData.find(item => item.checkbox_id === req.req_id)?.is_checked} 
          iconLabel={showIcons}
          cardWidth={cardWidth}
          iconSrc={iconSrc}>
        {children}
      </CheckCard>
    );
  }

  // ==================== Return page content =====================
  return (
    <>
      <Head>
        <title>Perfection Tracker</title>
      </Head>
      {
        isLoading ? (
          <Loading/>
        ) : (
          <main>
            <h1>Perfection Tracker</h1>
            {
              requirements.map((reqGroup) => {
                return (
                  reqGroup.subcategory_id && <CheckSection key={reqGroup.subcategory_id}
                      sectionId={reqGroup.subcategory} 
                      desc={reqGroup.label}>
                    {
                      reqGroup.reqs?.map((req) => {
                        return <PerfectionCard subcategory={reqGroup.subcategory} subcategoryId={reqGroup.subcategory_id} req={req} />
                      })
                    }
                  </CheckSection>
                )

              })
            }
          </main>
        )
      }
    </>

  );

}// end PerfectionTracker()