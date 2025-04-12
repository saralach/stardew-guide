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
        console.log('Error fetching documents');
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

          if(!res.ok)
            console.log(`uh oh - status ${res.status}, '${res.statusText}'`);
          else {
            const data = await res.json();
            setInitialCheckData(data);
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
              requirements.map((reqGroup) => {
                return (
                  <CheckSection 
                    key={reqGroup.subcategory_id}
                    category={checkboxCategory}
                    sectionId={reqGroup.subcategory} 
                    desc={reqGroup.label}
                    reqs={reqGroup.reqs}
                    initCompletedTasks={getInitialSectionData(reqGroup.subcategory)} 
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