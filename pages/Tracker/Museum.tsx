import Head from 'next/head';
import CheckSection from '@/components/CheckSection';
import Loading from '@/components/Loading';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ReqGroup } from '@/types/trackerReqTypes';
import { CheckData } from '@/types/userProgressTypes';

export default function MuseumTracker() {

  const rootUrl = process.env.NEXT_PUBLIC_ROOT_URL;
  const [requirements, setRequirements] = useState<ReqGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initialCheckData, setInitialCheckData] = useState<CheckData[]>([]);
  const [retrievedCheckData, setRetrievedCheckData] = useState(false);
  //const [isError, setIsError] = useState(false);
  const { data: session, status } = useSession();
  const checkboxCategory = 'Museum';

  function getInitialSectionData(subcategory: string) {
    const sectionInitialData: string[] = [];
    initialCheckData.forEach((checkData) => {
      if(checkData.subcategory === subcategory)
        sectionInitialData.push(checkData.checkbox_id);
    });
    return sectionInitialData;
  };

  // ============ Fetch requirement data from database =====================
  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const res = await fetch(`${rootUrl}/api/getMuseumReqs`);
        const data = await res.json();
        setRequirements(data);
      } 
      catch(error) {
        console.log('error fetching requirement data');
      }
    }
    fetchRequirements();
  }, []);


  // ============ Get initial checkbox data from database ==================
  useEffect(() => {
    const fetchInitialCheckboxData = async () => {
      if(status === 'loading') // session not yet loaded
        return;   

      try {
        if(!session) 
          console.log('Error - user not authenticated');
        else {
          const res = await fetch(`${rootUrl}/api/getCheckboxData/${checkboxCategory}`);
          const data = await res.json();
          if(res.ok) {
            setInitialCheckData(data);
            setRetrievedCheckData(true);
          }
          else {
            console.log(`uh oh - status ${res.status}, '${res.statusText}'`);
          }
        }          
      } 
      catch(error) {
        console.log('error fetching checkbox data');
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchInitialCheckboxData();
  }, [session, status]);
  
  // ============ Return page content ======================================
  return (
    <>
      <Head>
        <title>Museum Tracker | Stardew Guide</title>
      </Head>
      {
        isLoading ? (
          <Loading/>
        ) : (
          <main>
            <h1>Museum Tracker</h1>
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
                        showIcons={true}
                      />
                    )
                  })
                ) : (
                  <p data-testid='error-msg'>Oops! Error retrieving data.</p>
                )

              ) : (
                <p>Please sign in to use this tool.</p>
              )
            }
          </main>
        )
      }

    </>

  );

}// end MuseumPage()