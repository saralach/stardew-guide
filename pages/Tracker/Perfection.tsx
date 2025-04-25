/**
 * MODULE:  pages/Tracker/Perfection.tsx
 * 
 * SUMMARY:
 *   Displays perfection requirements with user's progress and allows user to update it.
 * 
 * API USAGE:
 *   - GET /api/getTrackerReqs/Perfection - for retrieving requirements
 *   - GET /api/getCheckboxData/Perfection - for retrieving initial user progress
 * 
 * DEPENDENCIES:
 *   - next-auth/react: for retrieving session data
 *   - next/head: for adding page title/metadata
 *   - react: for states and handling async behavior with useEffect
 *   - components/CheckSection: component to display & handle a single group of requirements
 *   - components/Loading: component to display while page is loading
 *   - types/trackerReqs: TypeScript type for requirement data retrieved from the API
 *   - types/userProgress: TypeScript type for user progress data retrieved from the API
 */

import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import CheckSection from '@/components/CheckSection';
import Loading from '@/components/Loading';
import { ReqGroup } from '@/types/trackerReqs';
import { CheckData } from '@/types/userProgress';


export default function PerfectionTracker() {

  const rootUrl = process.env.NEXT_PUBLIC_ROOT_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [requirements, setRequirements] = useState<ReqGroup[]>([]);
  const [initialCheckData, setInitialCheckData] = useState<CheckData[]>([]);
  const [retrievedCheckData, setRetrievedCheckData] = useState(false);
  const { data: session, status } = useSession();
  const checkboxCategory = 'Perfection';
  const iconSubcategories = [
    'Items Shipped', 'Monster Slayer','Great Friends', 'Level 10 Skills', 
    'Cooking', 'Crafting', 'Fishing'
  ];

  function getInitialSectionData(subcategory: string) {
    const sectionInitialData: string[] = [];
    initialCheckData.forEach((checkData) => {
      if(checkData.subcategory === subcategory)
        sectionInitialData.push(checkData.checkbox_id);
    });
    return sectionInitialData;
  };

  const getMainTaskCompletion = (subcategory: string) => {
    return initialCheckData.some((checkData) =>
      checkData.subcategory === undefined && checkData.checkbox_id === subcategory
    );
  };

  // ============ Fetch requirement data from database =====================
  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        //const res = await fetch(`${rootUrl}/api/getPerfectionReqs`);
        const res = await fetch(`${rootUrl}/api/getTrackerReqs/${checkboxCategory}`);
        const data = await res.json();
        console.log('requirements:');
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


  // ============ Get initial checkbox data ================================
  useEffect(() => {
      const fetchInitialCheckboxData = async () => {
        if(status === 'loading') //session not yet loaded
          return;

        try {
          if(!session) 
            console.log('Error - user not authenticated')
          else {
            const res = await fetch(`${rootUrl}/api/getCheckboxData/${checkboxCategory}`);
            
            if(!res.ok)
              console.log(`uh oh - status ${res.status}, "${res.statusText}"`);
            else {
              const data = await res.json();
              setInitialCheckData(data);
              setRetrievedCheckData(true);
            }
          }
        } 
        catch(error) {
            console.log('Error fetching documents');
            console.log(error);
        }
        finally {
          setIsLoading(false);
        }
      }
      fetchInitialCheckboxData();
  }, [session, status]);

  // ============ Return page content =========================-============
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
              session ? (
                (requirements !== undefined && retrievedCheckData) ? (
                  requirements.map((reqGroup) => {
                    return (
                      <CheckSection 
                        key={reqGroup.subcategory_id}
                        category={checkboxCategory}
                        sectionId={reqGroup.subcategory} 
                        desc={reqGroup.label ? reqGroup.label : reqGroup.subcategory}
                        reqs={reqGroup.reqs}
                        initCompletedTasks={getInitialSectionData(reqGroup.subcategory)} 
                        mainTaskIsComplete={getMainTaskCompletion(reqGroup.subcategory)}
                        showIcons={iconSubcategories.includes(reqGroup.subcategory)}
                      />
                    )
                  })
                ) : (
                  <p data-testid='error-msg'>Oops! Error retrieving data.</p>
                )
              ) : (
                <h3>Please sign in to use this tool.</h3>
              )
            }
          </main>
        )
      }
    </>

  );

}// end PerfectionTracker()