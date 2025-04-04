//import { Session } from "next-auth";

const handleChkChange = async ( category: string, subcategory: string | null, checkboxId: string,
                                isChecked: boolean ) => {
  
  //if(!session) return;        // Session is confirmed in the API route
  const rootUrl = process.env.NEXT_PUBLIC_ROOT_URL;

  const res = await fetch(`${rootUrl}/api/saveCheckboxData`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      category: category,
      subcategory: subcategory,
      checkboxId: checkboxId,
      isChecked: isChecked
    }),
  });

  if(res.ok)
    console.log("Updated checkbox data was successfully saved.");
  else
    console.log("ERROR ----- Updated checkbox data not saved.");

}

export default handleChkChange;