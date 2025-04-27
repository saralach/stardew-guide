/**
 * MODULE:  __tests__/Items/[itemname].test.tsx
 * 
 * SUMMARY:
 *   Test suites for testing the /Items/[itemname] page.
 *   Tests error handling and display of data upon successful fetch.
 * 
 * DEPENDENCIES:
 *   - @testing-library/react: for accessing the HTML DOM in tests
 *   - pages/Items/[itemname]: page to test
 */

import { render, screen, waitFor } from '@testing-library/react';
import ItemPage from '@/pages/Items/[itemname]';


jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { itemname: 'Dinosaur_Egg' },
    pathname: '/Items/[itemname]',
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Dynamic Item Page -- /Items/[itemname]', () => {

  it('displays error message when the API fails to fetch document', async () => {
    // Mock fetch API & error response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Failed to fetch document' })
      } as unknown as Response ) // Make TypeScript tolerate incomplete Response object
    );

    render(<ItemPage />);

    // Confirm error message gets displayed
    const errorMsgRegex = /^Oops.*not found\.$/;  // starts with 'Oops' & ends with 'not found.'
    await waitFor(() => {
      expect(screen.getByTestId('error-msg')).toHaveTextContent(errorMsgRegex);
    });

  });


  it('displays item data when API call succeeds', async () => {
    // Mock fetch API & successful response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          // Test data (Dinosaur Egg)
          item_name: 'Dinosaur Egg',
          desc: 'A giant dino egg... The entire shell is still intact!',
          category: 'Artifact',
          gift_type: 'Artifact',
          sell_price: 350,
          sources: [
            { source_category: 'Animal', sources: [{ source_name: 'Dinosaur' }] },
            {
              source_category: 'Monster',
              sources: [
                {
                  source_name: 'Pepper Rex',
                  locations: [{ location_name: 'Skull Cavern' }],
                  probability: 0.1
                }
              ]
            },
            {
              source_category: 'Artifact Spot',
              sources: [{ probability: 0.006, locations: [{ location_name: 'The Mountain' }] }]
            }
          ],
          uses: [
            {
              use_category: 'Equipment',
              uses: [
                {
                  product_name: 'Dinosaur Mayonnaise',
                  equipment_name: 'Mayonnaise Machine',
                  qty_obtained: 1,
                  item_costs: [{ item: 'Dinosaur Egg', qty: 1 }]
                }
              ]
            }
          ]
        }) // end json
      } as unknown as Response ) // Make TypeScript tolerate incomplete Response object
    );

    render(<ItemPage />);

    await waitFor(() => {
      // Check that the item name and description are displayed
      expect(screen.getByText('Dinosaur Egg')).toBeInTheDocument();
      expect(screen.getByText('A giant dino egg... The entire shell is still intact!'))
        .toBeInTheDocument();

      // Check that sources & uses are displayed
      expect(screen.getByText('Pepper Rex')).toBeInTheDocument();
      expect(screen.getByText('Dinosaur Mayonnaise')).toBeInTheDocument();
    });
  });

}); //end Items/[itemname] test suite