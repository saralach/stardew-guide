import { render, screen, waitFor } from '@testing-library/react';
import ItemPage from '@/pages/Items/[itemname]';

beforeEach(() => {
  jest.resetAllMocks();
})

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

    // Confirm error message gets displayed
    render(<ItemPage />);
    const errorMsgRegex = /^Oops.*not found\.$/; // starts with "Oops", ends with "not found."
    await waitFor(() => {
      expect(screen.getByTestId('error-msg')).toHaveTextContent(errorMsgRegex);
    });

  });

}); //end Items/[itemname] test suite