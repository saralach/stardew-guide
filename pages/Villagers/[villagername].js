import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function VillagerPage() {
  const router = useRouter();
  const { villagername } = router.query;

  const [villagerInfo, setVillagerInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVillagerInfo = async () => {
      try {
          const res = await fetch(`/api/villagers/${villagername}`);
          const data = await res.json();
          setVillagerInfo(data);
      } 
      catch(error) {
          console.log('Error fetching documents');
      }
      finally {
          setLoading(false);
          console.log("in finally");
      }
      }

      if(villagername) {
        console.log("got villager name, fetching data");
        fetchVillagerInfo();
      }
  }, [villagername]); /* executes again when villagername is changed */


  if(loading) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <h1>{router.query.villagername}</h1>

      <div className="flex flex-col justify-center items-center flex-nowrap">
        <img className="villager-pic-lg block" src={`/Villager/${router.query.villagername}.png`}/>

        <table className="villagerinfo">
          <tbody>
            <tr>
              <td className="labelcell">
                Birthday
              </td>
              <td className="infocell">
                {`${villagerInfo.bday_season} ${villagerInfo.bday_date}`}
              </td>
            </tr>
            <tr>
              <td className="labelcell">
                Lives In
              </td>
              <td className="infocell">
                {villagerInfo.home_location}
              </td>
            </tr>
            <tr>
              <td className="labelcell">
                Address
              </td>
              <td className="infocell">
                {villagerInfo.address}
              </td>
            </tr>
            <tr>
              <td className="labelcell">
                Can Marry
              </td>
              <td className="infocell">
                {villagerInfo.can_marry ? "Yes" : "No"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </main>
  );
}