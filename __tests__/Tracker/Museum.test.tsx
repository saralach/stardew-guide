import { act, render, screen, waitFor } from '@testing-library/react';
import MuseumTracker from '@/pages/Tracker/Museum';
import { SessionProvider } from 'next-auth/react';

beforeEach(() => {
  jest.resetAllMocks();
});

const mockSession = {
  user: { username: "totallyRealUser" },
  expires: '2099-01-01T00:00:00.000Z'
}

// -------------- getMock() functions -----------------------------
function getMockReqsResponse() {
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve([
      {
        subcategory: 'Minerals',
        subcategory_id: 1,
        reqs: [ 
          { req_id: 'Quartz' }, 
          { req_id: 'Earth Crystal' }, 
          { req_id: 'Frozen Tear' }
        ]
      },
      {
        subcategory: 'Artifacts',
        subcategory_id: 2,
        reqs: [
          { req_id: 'Dwarf Scroll IV' },
          { req_id: 'Arrowhead' },
          { req_id: 'Ancient Doll' }
        ]
      }
    ])
  } as unknown as Response );
};

function getMockErrorResponse() {
  return Promise.resolve({
    ok: false,
    status: 500,
    json: () => Promise.resolve({ error: 'Failed to fetch documents' })
  } as unknown as Response );
};

function getMockChkResponse(isEmpty: boolean) {
  const userChkData = isEmpty ? [] : [
    { subcategory: 'Minerals', checkbox_id: 'Quartz' },
    { subcategory: 'Minerals', checkbox_id: 'Frozen Tear' },
    { subcategory: 'Minerals', checkbox_id: 'Arrowhead' },
    { subcategory: 'Minerals', checkbox_id: 'Ancient Doll' }
  ];
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(userChkData)
  } as unknown as Response );
};


// =========================== MUSEUM TRACKER TESTS ===========================
describe('Museum Tracker Page -- /Tracker/Museum', () => {

  // =========================== Signed in user ===========================
  describe('user is signed in', () => {

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('displays error msg when fails to fetch reqs & user data', async () => {
      // Mock fetch API & responses
      global.fetch = jest.fn()
        .mockResolvedValueOnce( getMockErrorResponse() )
        .mockResolvedValueOnce( getMockErrorResponse() );
  
      render(
        <SessionProvider session={mockSession}>
          <MuseumTracker />
        </SessionProvider>
      );
  
      // Confirm error message gets displayed
      await waitFor(() => {
        expect(screen.getByTestId('error-msg'))
          .toHaveTextContent('Oops! Error retrieving data.');
      });
    });
  
  
    it('displays error message when fails to fetch user checkbox data', async () => {
      // Mock fetch API & responses
      global.fetch = jest.fn()
        .mockResolvedValueOnce( getMockReqsResponse() )   // Requirements
        .mockResolvedValueOnce( getMockErrorResponse() ); // User Chk Data
  
      render(
        <SessionProvider session={mockSession}> 
          <MuseumTracker />
        </SessionProvider>
      );
  
      // Confirm error message gets displayed
      await waitFor(() => {
        expect(screen.getByTestId('error-msg'))
          .toHaveTextContent('Oops! Error retrieving data.');
      });
    });

    
    it('displays unchecked checkboxes when user has no checkbox data', async () => {
      // Mock fetch API & responses
      global.fetch = jest.fn((url: string | URL | Request) => {
        const urlStr = url.toString();

        if(urlStr.includes('api/getMuseumReqs'))
          return getMockReqsResponse();
        else if(urlStr.includes('api/getCheckboxData'))
          return getMockChkResponse(true);
        
        return Promise.reject('Invalid URL');
      });

      render(
        <SessionProvider session={mockSession}> 
          <MuseumTracker />
        </SessionProvider>
      );

      // Confirm checkboxes are displayed correctly
      await waitFor(() => {
        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes).toHaveLength(6); 

        // Confirm checkboxes from both subcategories are present & have their proper labels
        expect(screen.getByLabelText(/Earth Crystal/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Arrowhead/)).toBeInTheDocument();
        

        // Confirm subcategory headers are present
        expect(screen.getByText('Artifacts')).toBeInTheDocument();
        expect(screen.getByText('Minerals')).toBeInTheDocument();

        // Confirm that no checkboxes are checked
        checkboxes.forEach((checkbox) => {
          expect(checkbox).not.toBeChecked();
        })
      });
    });


    it('displays checkboxes both requests are successful and user has data', async () => {
      // Mock fetch API & responses
      global.fetch = jest.fn((url: string | URL | Request) => {
        const urlStr = url.toString();

        if(urlStr.includes('api/getMuseumReqs'))
          return getMockReqsResponse();
        else if(urlStr.includes('api/getCheckboxData'))
          return getMockChkResponse(false);

        return Promise.reject('Invalid URL');
      });

      render(
        <SessionProvider session={mockSession}> 
          <MuseumTracker />
        </SessionProvider>
      );

      // Confirm checkboxes are displayed correctly
      await waitFor(() => {
        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes).toHaveLength(6);

        // Confirm checkboxes from both subcategories are present & have their proper labels
        expect(screen.getByLabelText(/Earth Crystal/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Arrowhead/)).toBeInTheDocument();
        

        // Confirm subcategory headers are present
        expect(screen.getByText('Artifacts')).toBeInTheDocument();
        expect(screen.getByText('Minerals')).toBeInTheDocument();

        // Confirm checkbox that should be checked is checked
        expect(screen.getByLabelText(/Frozen Tear/)).toBeChecked();

        // Confirm checkbox that should not be checked is not checked
        expect(screen.getByLabelText(/Dwarf Scroll IV/)).not.toBeChecked();
      });
    });

  }); // end signed in user tests

  // ========================= Not signed in user =========================
  describe('user is NOT signed in', () => {

    it('displays prompt to sign in if user is not signed in', async () => {

      // Render Museum page, simulating a user who is logged in
      render(
        <SessionProvider session={null}> 
          <MuseumTracker />
        </SessionProvider>
      );
  
      // Confirm error message gets displayed
      await waitFor(() => {
        expect(screen.getByText('Please sign in to use this tool.')).toBeInTheDocument();
      });
    });
  });

}); //end Items/[itemname] test suite