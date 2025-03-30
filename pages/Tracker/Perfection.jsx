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
  const rootUrl = process.env.NEXT_PUBLIC_ROOT_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [requirements, setRequirements] = useState([]);
  const [initialCheckData, setInitialCheckData] = useState([]);
  const { data: session, status } = useSession();
  const checkboxCategory = "Perfection";

  const getInitialSectionData = (subcategory) => {
    const sectionInitialData = [];
    initialCheckData.forEach((checkData) => {
      if(checkData.subcategory === subcategory)
        sectionInitialData.push(checkData.checkbox_id);
    });
    /*const sectionInitialData = initialCheckData.filter((checkData) => 
      checkData.subcategory === subcategory
    );
    console.log(`${subcategory} initial data:`);
    console.log(sectionInitialData);*/
    return sectionInitialData;
  }

  const getMainTaskCompletion = (subcategory) => {
    return initialCheckData.some((checkData) =>
      checkData.subcategory === undefined && checkData.checkbox_id === subcategory
    );
  }


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
                  <CheckSection 
                    key={reqGroup.subcategory_id}
                    category={checkboxCategory}
                    sectionId={reqGroup.subcategory} 
                    desc={reqGroup.label}
                    reqs={reqGroup.reqs}
                    initCompletedTasks={getInitialSectionData(reqGroup.subcategory)} 
                    mainTaskIsComplete={getMainTaskCompletion(reqGroup.subcategory)}
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







  /*const getCheckedStatus = (subcategory, checkboxId) => {
    return checkboxData.some((data) =>
      data.subcategory === subcategory && data.completed_tasks?.includes(checkboxId)
    );
  };*/

  // ================== Handle checkbox changes ===================
  /*const handleCheckboxChange = async (isChecked, checkboxId, subcategory) => {
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
          category: checkboxCategory,
          subcategory: subcategory
        }),
      });

      const data = res.json();
      if(!data.status === 200)
        console.log("Updated checkbox data not saved.");
      else {
        // Update checkbox data
        setCheckboxData((prevCheckboxData) => {
          const subcategoryExists = prevCheckboxData.some(subcategoryData => 
            subcategoryData.subcategory === subcategory
          );
          if(subcategoryExists) { 
            // Update existing subcategory's data
            return prevCheckboxData.map((subcategoryData) => {
              if(subcategoryData.subcategory === subcategory) {
                let updatedTasks;
                if(isChecked) {
                  // Add checkboxId to completed_tasks array
                  updatedTasks = [...subcategoryData.completed_tasks, checkboxId];
                }
                else {
                  // Remove checkboxId from completed_tasks array
                  updatedTasks = subcategoryData.completed_tasks.filter(id => id !== checkboxId);
                }
                return { ...subcategoryData, completed_tasks: updatedTasks };
              }
              else
                return subcategoryData;
            });
          }
          else {
            // Add new subcategory
            const newSubcategoryData = {
              subcategory: subcategory,
              completed_tasks: [ checkboxId ]
            }
            return [...prevCheckboxData, newSubcategoryData]
          }

        });
      }
    }
  } //end handleCheckboxChange()*/
  