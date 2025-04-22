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
          name: "Abigail",
          gender: "Female",
          bday_season: "Fall",
          bday_date: 13,
          home_location: "Pelican Town",
          address: "Pierre's General Store",
          can_marry: true,
          "gift_prefs": {
            items: [
              { item_name: "Amethyst", pref_num: 5 },
              { item_name: "Banana Pudding", pref_num: 5 },
              { item_name: "Blackberry Cobbler", pref_num: 5 },
              { item_name: "Chocolate Cake", pref_num: 5 },
              { item_name: "Monster Compendium", pref_num: 5 },
              { item_name: "Pufferfish", pref_num: 5 },
              { item_name: "Pumpkin", pref_num: 5 },
              { item_name: "Spicy Eel", pref_num: 5 },
            ]
          }
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