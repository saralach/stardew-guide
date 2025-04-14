import { act, render, screen, waitFor } from '@testing-library/react';
import AllItemsPage from '@/pages/Items/index';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('All Items Page -- /Items', () => {

  it('displays error message when the API fails to fetch document', async () => {
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

}); //end Items/[itemname] test suite