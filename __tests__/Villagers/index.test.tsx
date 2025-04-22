import { render, screen, waitFor } from '@testing-library/react';
import AllVillagersPage from '@/pages/Villagers/index';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('All Villagers Page -- /Villagers', () => {

  it('displays error message when the API fails to fetch data', async () => {
    // Mock fetch API & error response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Failed to fetch documents' })
      } as unknown as Response ) // Make TypeScript tolerate incomplete Response object
    );

    render(<AllVillagersPage />);

    // Confirm error message gets displayed
    await waitFor(() => {
      expect(screen.getByTestId('error-msg'))
        .toHaveTextContent('Oops! Villagers could not be retrieved.');
    });
  });

  it('displays villagers when fetch was successful', async () => {
    // Mock fetch API & successful response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(['Elliott', 'Caroline'])
      } as unknown as Response ) // Make TypeScript tolerate incomplete Response object
    );

    render(<AllVillagersPage />);

    // Confirm villagers get displayed
    await waitFor(() => {
      expect(screen.getByText('Elliott')).toBeInTheDocument();
      expect(screen.getByText('Caroline')).toBeInTheDocument();
    });
  });

}); //end Items/[itemname] test suite