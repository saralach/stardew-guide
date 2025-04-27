/**
 * MODULE:  __tests__/Villagers/[villagername].test.tsx
 * 
 * SUMMARY:
 *   Test suite for testing the /Villagers/[villagername] page.
 *   Tests error handling and display of data upon successful fetch.
 * 
 * DEPENDENCIES:
 *   - @testing-library/react: for accessing the HTML DOM in tests
 *   - pages/Villagers/[villagername]: page to test
 */

import { render, screen, waitFor } from '@testing-library/react';
import VillagerPage from '@/pages/Villagers/[villagername]';


jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { villagername: 'Abigail' },
    pathname: '/Villagers/[villagername]',
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Dynamic Villagers Page -- /Villagers/[villagername]', () => {

  it('displays error message when the API fails to fetch data', async () => {
    // Mock fetch API & error response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Failed to fetch document' })
      } as unknown as Response ) // Make TypeScript tolerate incomplete Response object
    );

    render(<VillagerPage />);

    // Confirm error message gets displayed
    await waitFor(() => {
      expect(screen.getByTestId('error-msg')).toHaveTextContent("No villager found with the name 'Abigail'");
    });

  });


  it('displays villager data when API call succeeds', async () => {
    // Mock fetch API & successful response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          // Test data (Abigail)
          name: 'Abigail',
          gender: 'Female',
          bday_season: 'Fall',
          bday_date: 13,
          home_location: 'Pelican Town',
          address: "Pierre's General Store",
          can_marry: true,
          'gift_groups': [{
            pref: 'Love',
            items: [ 
              'Amethyst', 'Banana Pudding', 'Blackberry Cobbler', 'Chocolate Cake', 
              'Monster Compendium', 'Pufferfish', 'Pumpkin', 'Spicy Eel'
            ]
          }]
        }) // end json
      } as unknown as Response ) // Make TypeScript tolerate incomplete Response object
    );

    render(<VillagerPage />);

    await waitFor(() => {
      // Check that the villager name is displayed
      expect(screen.getByText('Abigail')).toBeInTheDocument();

      // Check that birthday is displayed
      expect(screen.getByText('Fall 13')).toBeInTheDocument();

      // Check that loved gifts are displayed
      expect(screen.getByText('Banana Pudding')).toBeInTheDocument();
    });
  });

}); //end Items/[itemname] test suite