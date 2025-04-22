import { act, render, screen, waitFor } from '@testing-library/react';
import AllItemsPage from '@/pages/Items/index';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('All Items Page -- /Items', () => {

  it('displays error message when the API fails to fetch data', async () => {
    // Mock fetch API & error response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Failed to fetch documents' })
      } as unknown as Response ) // Make TypeScript tolerate incomplete Response object
    );

    render(<AllItemsPage />);

    // Confirm error message gets displayed
    await waitFor(() => {
      expect(screen.getByTestId('error-msg'))
        .toHaveTextContent('Oops! Items could not be retrieved.');
    });
  });

  it('displays items when fetch was successful', async () => {
    // Mock fetch API & successful response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve([
          { _id: 'Animal Product', items: ['Ostrich Egg', 'Goat Milk'] },
          { _id: 'Vegetable', items: ['Eggplant', 'Fiddlehead Fern'] }
        ])
      } as unknown as Response ) // Make TypeScript tolerate incomplete Response object
    );

    render(<AllItemsPage />);

    // Confirm items get displayed
    await waitFor(() => {
      expect(screen.getByText('Ostrich Egg')).toBeInTheDocument();
      expect(screen.getByText('Fiddlehead Fern')).toBeInTheDocument();
    });
  });

}); //end Items/[itemname] test suite