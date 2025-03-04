import CheckItem from "../components/CheckItem";
import IconLink from "../components/IconLink";
import SingleCheck from "../components/SingleCheck";
import { ChevronUp, ChevronDown, Info } from 'lucide-react';
import { useEffect, useState } from 'react';


export default function CookingRecipeTracker() {
  //let cookingRecipes;
  const [cookingRecipes, setCookingRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  let recipeNum = 1;

  useEffect(() => {
      const fetchRecipes = async () => {
          try {
              const res = await fetch('api/cooking');
              const data = await res.json();
              setCookingRecipes(data);
              console.log("Data:");
              console.log(data);
              console.log("cookingRecipes (in try):");
              console.log(cookingRecipes);
          } 
          catch(error) {
              console.log('Error fetching documents');
          }
          finally {
              setLoading(false);
          }
      }

      fetchRecipes();
      console.log("cookingRecipes:");
      console.log(cookingRecipes);
  }, []);

  if(loading)
    return <div>Loading...</div>;
  else
  return (
    <main>
      <h1>Cooking Recipes Checklist <Info className="inline ms-2 text-gray-500"/></h1>
      <section id="cooking-recipes" className="flex flex-row flex-wrap justify-center">
          {/*<div className="flex justify-between">
              <label className="check-container">
                  <input 
                    type="checkbox" 
                    id={"cooking-recipes-checkbox"} 
                    name={"cooking-recipes"} 
                    value={"cooking-recipes"}
                  />
                  Cook every recipe.
              </label>
              <ChevronDown className="inline"/>
          </div>
          <div className="flex flex-row flex-wrap justify-center">*/}
            {
              cookingRecipes.map( (recipe) => (
                <SingleCheck key={recipeNum++} requirement={recipe.item_produced} reqCategory="Cooking" reqItems={recipe.ingredients} />
              ))
            }
          {/*</div>*/}
      </section>
    </main>
  );
}