/**
 * MODULE:  components/ItemHeader
 * 
 * SUMMARY:
 *   Displays item header, including energy, health, and sell price (if they exist) for each possible quality.
 * 
 * DEPENDENCIES:
 *   - components/IconLabel: for displaying items with icons
 * 
 * USED BY:
 *   - pages/Items/[itemname].tsx
 */

import IconLabel from './IconLabel';

interface ItemHeaderProps {
  baseSellPrice?: number;
  maxQuality?: string;
  energy?: number;
  health?: number;
  isEdible: boolean;
}

// Multiplier arrays for each quality level [base, silver, gold, iridium]
const priceMultipliers = [1, 1.25, 1.5, 2];
const edibilityMultipliers = [1, 1.4, 1.8, 2.6];
const qualityOptions = [undefined, 'silver', 'gold', 'iridium']

function ItemHeader({ baseSellPrice, maxQuality = '', energy = 0, health = 0, isEdible }: ItemHeaderProps) {
  if (baseSellPrice === undefined && !isEdible)
    return null; //nothing to display

  const NUM_QUALITIES = getNumQualities(maxQuality);
  const energyVals = [];
  const healthVals = [];
  const sellPriceVals = [];

  // Get values to display for each possible quality
  for (let i = 0; i < NUM_QUALITIES; i++) {
    if(isEdible) {
      energyVals.push(Math.floor(energy * edibilityMultipliers[i]));
      healthVals.push(Math.floor(health * edibilityMultipliers[i]));
    }
    if(baseSellPrice !== undefined)
      sellPriceVals.push(Math.floor(baseSellPrice * priceMultipliers[i]));
  }

  return (
    <>
        { // ============ Energy & Health ============ 
          isEdible && (
            <>
              <div className='flex flex-col no-wrap'>
                {
                  energyVals.map((energyAmt, index) => (
                    <IconLabel
                      label={energyAmt ? energyAmt.toString() : '0'}
                      category='Icon'
                      altImgSrc='Energy'
                      quality={qualityOptions[index]}
                      key={`energy-${index}`}
                    />
                  ))
                }
              </div>
              <div className='flex flex-col no-wrap'>
                {
                  healthVals.map((healthAmt, index) => (
                    <IconLabel
                      label={healthAmt ? healthAmt.toString() : '0'}
                      category='Icon'
                      altImgSrc='Health'
                      quality={qualityOptions[index]}
                      key={`health-${index}`}
                    />
                  ))
                }
              </div>
            </>
          )
        }
        { // ============== Sell Price ==============
          baseSellPrice !== undefined && (
            <div className='flex flex-col no-wrap'>
              {
                sellPriceVals.map((sellPrice, index) => (
                  <IconLabel
                    label={`${sellPrice}g`}
                    altImgSrc='Gold'
                    quality={qualityOptions[index]}
                    key={`health-${index}`}
                  />
                ))
              }
            </div>
          )
        }
    </>
  );
} // end ItemHeader


// =================== getNumQualities() (Helper Function) ===================
function getNumQualities(maxQuality: string): number {
  let qualitiesToDisplay = 1;

  switch(maxQuality.trim().toLowerCase()) {
    case 'iridium': 
      qualitiesToDisplay = 4;
      break;
    case 'gold':
      qualitiesToDisplay = 3;
      break;
    case 'silver':
      qualitiesToDisplay = 2;
      break;
    default:
      qualitiesToDisplay = 1;
  }

  return qualitiesToDisplay;
}


export default ItemHeader;