import Head from "next/head";
import IconLink from "@/components/IconLink";
import CheckCard from "@/components/CheckCard";
import CheckSection from "@/components/CheckSection";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function MuseumTracker() {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [initialCheckData, setInitialCheckData] = useState([]);
  const { data: session, status } = useSession();
  const checkboxCategory = "Museum";


  const toggleCompletedTasks = (event) => {
    setHideCompleted(event.target.checked);
  };

  const getInitialSectionData = (subcategory) => {
    const sectionInitialData = [];
    initialCheckData.forEach((checkData) => {
      if(checkData.subcategory === subcategory)
        sectionInitialData.push(checkData.checkbox_id);
    });
    return sectionInitialData;
  };


  // ============ Fetch requirement data from database ============
  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const res = await fetch('/../api/getMuseumReqs');
        const data = await res.json();
        /*setArtifacts(data.artifacts);
        setMinerals(data.minerals);*/
        setRequirements(data);
      } 
      catch(error) {
        console.log('Error fetching documents');
      }
      finally {
        setLoading(false);
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
          setInitialCheckData(data);
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
  

  // ================= Return page content ========================
  return (
    <>
      <Head>
        <title>Museum Tracker | Stardew Guide</title>
      </Head>
      {
        loading ? (
          <Loading/>
        ) : (
          <main>
            <h1>Museum Tracker</h1>
            {
              requirements.map((reqGroup) => {
                return (
                  <CheckSection 
                    key={reqGroup.subcategory_id}
                    category={checkboxCategory}
                    sectionId={reqGroup.subcategory} 
                    desc={reqGroup.label}
                    reqs={reqGroup.reqs}
                    initCompletedTasks={getInitialSectionData(reqGroup.subcategory)} 
                    hideCompleted={hideCompleted}
                    showIcons={true}
                    />
                )
              })
            }

          </main>
        )
      }

    </>

  );

}// end MuseumPage()
            /*<CheckSection sectionId="Artifacts" desc="Artifacts Donated">
            {
              artifacts.map((artifact) => {
                return (
                  <CheckCard 
                    task={artifact.item_name} 
                    category="Artifact" 
                    cardWidth={CardWidth.Wide}
                    iconLabel={true}
                    isChecked={
                      checkboxData.find(item => item.checkbox_id === artifact.item_name)?.is_checked
                    }
                    onChange={handleCheckboxChange}/>
                );
              })
            }
            </CheckSection>

            <CheckSection sectionId="Minerals" desc="Minerals Donated">
            {
              minerals.map((mineral) => {
                return (
                  <CheckCard 
                    task={mineral.item_name} 
                    category="Mineral" 
                    cardWidth={CardWidth.Wide}
                    iconLabel={true}
                    isChecked={
                      checkboxData.find(item => item.checkbox_id === mineral.item_name)?.is_checked
                    }
                    onChange={handleCheckboxChange}/>
                );
              })
            }
            </CheckSection>*/