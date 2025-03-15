import { useEffect, useState } from 'react';

export default function AllVillagersPage() {

  const [villagers, setVillagers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchVillagers = async () => {
          try {
              const res = await fetch('/../api/villagers');
              const data = await res.json();
              setVillagers(data);
          } 
          catch(error) {
              console.log('Error fetching documents');
          }
          finally {
              setLoading(false);
          }
      }
      fetchVillagers();
  }, []);

  
  if(loading) {
    return <div>Loading...</div>;
  }
  else {
    return (
      <main>
        <h1>Villagers</h1>
        <div class="cards-container">
          {
            villagers.map( (villager) => (
              <a class="cardlink villagerlink" href={`Villagers/${villager.name}`}>
                <img className="villagerphoto" src={`/Villager/${villager.name}.png`} alt={`${villager.name}'s portrait`} />
                <p>{villager.name}</p>
              </a>
            ))
          }
        </div>
      </main>
    );
  }
}