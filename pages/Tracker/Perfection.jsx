import Head from "next/head";
import CheckSection from "@/components/CheckSection";
import ToggleSwitch from "@/components/ToggleSwitch";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function PerfectionTracker() {
  const rootUrl = process.env.NEXT_PUBLIC_ROOT_URL;
  const [hideCompleted, setHideCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [requirements, setRequirements] = useState([]);
  const [initialCheckData, setInitialCheckData] = useState([]);
  const { data: session, status } = useSession();
  const checkboxCategory = "Perfection";
  const iconSubcategories = [
    'Items Shipped', 'Monster Slayer','Great Friends', 'Level 10 Skills', 
    'Cooking', 'Crafting', 'Fishing'
  ];

  /*const toggleCompletedTasks = (event) => {
    setHideCompleted(event.target.checked);
  };*/

  const getInitialSectionData = (subcategory) => {
    const sectionInitialData = [];
    initialCheckData.forEach((checkData) => {
      if(checkData.subcategory === subcategory)
        sectionInitialData.push(checkData.checkbox_id);
    });
    return sectionInitialData;
  };

  const getMainTaskCompletion = (subcategory) => {
    return initialCheckData.some((checkData) =>
      checkData.subcategory === undefined && checkData.checkbox_id === subcategory
    );
  };

  // ============ Fetch requirement data from database ============
  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const res = await fetch(`${rootUrl}/api/getPerfectionReqs`);
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
      const fetchInitialCheckboxData = async () => {
        if(status === "loading") {
          return; //session not yet loaded
        }
        try {
          if(session) {
            const res = await fetch(`${rootUrl}/api/getCheckboxData/${checkboxCategory}`);
            const data = await res.json();
            console.log(data);
            setInitialCheckData(data);
            console.log("initialCheckboxData has been set.");
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
      fetchInitialCheckboxData();
  }, [session, status]);


  // ==================== Return page content =====================
  return (
    <>
      <Head>
        <title>Perfection Tracker | Stardew Guide</title>
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
                  <CheckSection 
                    key={reqGroup.subcategory_id}
                    category={checkboxCategory}
                    sectionId={reqGroup.subcategory} 
                    desc={reqGroup.label}
                    reqs={reqGroup.reqs}
                    initCompletedTasks={getInitialSectionData(reqGroup.subcategory)} 
                    mainTaskIsComplete={getMainTaskCompletion(reqGroup.subcategory)}
                    showIcons={iconSubcategories.includes(reqGroup.subcategory)}
                  />
                )
              })
            }
          </main>
        )
      }
    </>

  );

}// end PerfectionTracker()