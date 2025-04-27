/**
 * MODULE:  __tests__/Tracker/Trackers.test.tsx
 * 
 * SUMMARY:
 *   Test suites for testing all of the /Trackers pages.
 *   For each page, tests:
 *   - display of error message if user is not signed in
 *   - when signed in: 
 *      - handling of various API responses (error handling & display of checkboxes)
 *      - checking and unchecking functionality
 * 
 * DEPENDENCIES:
 *   - @testing-library/react: for accessing the HTML DOM in tests
 *   - next-auth/react: for wrapping page in SessionProvider
 *   - react: for Component TypeScript type
 *   - jest/testHelpers: for mock API responses and mock sessions
 *   - lib/handleChkChange: for mocking implementation of handleChkChange()
 *   - pages/Tracker/Bundles: page to test
 *   - pages/Tracker/Museum: page to test
 *   - pages/Tracker/Perfection: page to test
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { ComponentType } from 'react';
import {
  getMockChkResponse,
  getMockErrorResponse,
  getMockReqsResponse,
  getMockSession
} from '@/jest/testHelpers';
import handleChkChange from '@/lib/handleChkChange';
import BundlesTracker from '@/pages/Tracker/Bundles';
import MuseumTracker from '@/pages/Tracker/Museum';
import PerfectionTracker from '@/pages/Tracker/Perfection';


jest.mock('../../lib/handleChkChange');

interface Tracker {
  trackerCategory: string;
  PageComponent: ComponentType;
}

const trackersToTest: Tracker[] = [
  { trackerCategory: 'Museum', PageComponent: MuseumTracker },
  { trackerCategory: 'Perfection', PageComponent: PerfectionTracker },
  { trackerCategory: 'Bundles', PageComponent: BundlesTracker }
];

// ============================== MUSEUM TRACKER TESTS ==============================
describe.each(trackersToTest)('$trackerCategory Tracker Page -- /Tracker/$trackerCategory', ({trackerCategory, PageComponent}) => {

  afterEach(() => {
    // Clear mock call history & reset mock implementation
    jest.resetAllMocks();
  });

  // ================================ Signed in user ================================
  describe('user is signed in', () => {

    // ----------------- Testing display for various API responses -------------------
    describe('test display for various different API responses', () => {

      it('displays error msg when fails to fetch reqs & user data', async () => {
        // Mock fetch API & responses
        global.fetch = jest.fn()
          .mockResolvedValueOnce( getMockErrorResponse() )
          .mockResolvedValueOnce( getMockErrorResponse() );
    
        render(
          <SessionProvider session={getMockSession()}>
            <PageComponent />
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
          <SessionProvider session={getMockSession()}> 
            <PageComponent />
          </SessionProvider>
        );
    
        // Confirm error message gets displayed
        await waitFor(() => {
          expect(screen.getByTestId('error-msg'))
            .toHaveTextContent('Oops! Error retrieving data.');
        });
      });
  
      
      it('displays all unchecked checkboxes when user has no checkbox data', async () => {
        // Mock fetch API & responses
        global.fetch = jest.fn((url: string | URL | Request) => {
          const urlStr = url.toString();
          if(urlStr.includes('api/getTrackerReqs'))
            return getMockReqsResponse();
          else if(urlStr.includes('api/getCheckboxData'))
            return getMockChkResponse(true);
          return Promise.reject('Invalid URL');
        });
  
        render(
          <SessionProvider session={getMockSession()}> 
            <PageComponent />
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
  
  
      it('displays checkboxes when both requests are successful and user has data', async () => {
        // Mock fetch API & responses
        global.fetch = jest.fn((url: string | URL | Request) => {
          const urlStr = url.toString();
          if(urlStr.includes('api/getTrackerReqs'))
            return getMockReqsResponse();
          else if(urlStr.includes('api/getCheckboxData'))
            return getMockChkResponse(false);
          return Promise.reject('Invalid URL');
        });
  
        render(
          <SessionProvider session={getMockSession()}> 
            <PageComponent />
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
    }); // end chkbox display testing



    // --------------- Testing checking and unchecking functionality ---------------
    describe('test checking and unchecking functionality', () => {
      
      beforeEach(() => {
        // Mock fetch API & responses
        global.fetch = jest.fn((url: string | URL | Request) => {
          const urlStr = url.toString();
          if(urlStr.includes('api/getTrackerReqs'))
            return getMockReqsResponse();
          else if(urlStr.includes('api/getCheckboxData'))
            return getMockChkResponse(false);
          return Promise.reject('Invalid URL');
        });
  
        render(
          <SessionProvider session={getMockSession()}> 
            <PageComponent />
          </SessionProvider>
        );
      });
  
      it('allows an unchecked checkbox to be checked, then unchecked', async () => {
        const chkLabelText = 'Dwarf Scroll IV';
        const checkbox = await screen.findByLabelText(chkLabelText);
        
        // Confirm checkbox starts out unchecked
        await waitFor(() => {
          const checkbox = screen.getByLabelText(chkLabelText);
          expect(checkbox).not.toBeChecked();
        });

        // Click checkbox, then confirm it calls handleChkChange() & checkbox becomes checked
        fireEvent.click(checkbox);

        await waitFor(() => {  
          expect(handleChkChange).toHaveBeenCalled();
          expect(handleChkChange).toHaveBeenCalledWith(trackerCategory, 'Artifacts', chkLabelText, true);
          expect(checkbox).toBeChecked();
        });

        // Click checkbox again, confirm it calls handleChkChange() & checkbox becomes unchecked
        fireEvent.click(checkbox);

        await waitFor(() => {
          expect(handleChkChange).toHaveBeenCalled();
          expect(handleChkChange).toHaveBeenCalledWith(trackerCategory, 'Artifacts', chkLabelText, false);
          expect(checkbox).not.toBeChecked();
        });
      });
      
      it('allows a checked checkbox to be unchecked, then checked again', async () => {
        const chkLabelText = 'Frozen Tear';
        const checkbox = await screen.findByLabelText(chkLabelText);

        // Confirm checkbox starts out checked
        await waitFor(() => {
          expect(checkbox).toBeInTheDocument();
          expect(checkbox).toBeChecked();
        });

        // Click checkbox, then confirm it calls handleChkChange() & checkbox becomes unchecked
        fireEvent.click(checkbox);
        await waitFor(() => {
          expect(handleChkChange).toHaveBeenCalled();
          expect(handleChkChange).toHaveBeenCalledWith(trackerCategory, 'Minerals', chkLabelText, false);
          expect(checkbox).not.toBeChecked();
        });

        // Click checkbox again, confirm it calls handleChkChange() & checkbox becomes checked
        fireEvent.click(checkbox);
        await waitFor(() => {
          expect(handleChkChange).toHaveBeenCalled();
          expect(handleChkChange).toHaveBeenCalledWith(trackerCategory, 'Minerals', chkLabelText, true);
          expect(checkbox).toBeChecked();
        });
      });

    }); // end check & uncheck functionality tests




  }); // end signed in user tests

  // ============================== Not signed in user ==============================
  describe('user is NOT signed in', () => {

    it('displays prompt to sign in if user is not signed in', async () => {

      // Render Museum page, simulating a user who is logged in
      render(
        <SessionProvider session={null}> 
          <PageComponent />
        </SessionProvider>
      );
  
      // Confirm error message gets displayed
      await waitFor(() => {
        expect(screen.getByText('Please sign in to use this tool.')).toBeInTheDocument();
      });
    });
  });

}); //end Items/[itemname] test suite