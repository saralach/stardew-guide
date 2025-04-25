/**
 * MODULE:  lib/handleChkChange
 * 
 * SUMMARY:
 *   This function is used as the onClick function for Tracker checkboxes. 
 *   It sends a POST request to api/saveCheckboxData, which updates the 
 *   user progress in the database.
 * 
 * API USAGE:
 *   - pages/api/saveCheckboxData: for updating the database
 * 
 * USED BY:
 *   - components/CheckCard.tsx
 *   - components/CheckSection.tsx
 */

const handleChkChange = async ( category: string, subcategory: string | null, checkboxId: string,
                                isChecked: boolean ): Promise<void> => {
  
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