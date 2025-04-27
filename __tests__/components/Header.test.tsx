/**
 * MODULE:  __tests__/components/Header.test.tsx
 * 
 * SUMMARY:
 *   Test suites for testing the Header component.
 *   Tests that tabs and subtabs are displayed as intended and are/aren't links when necessary.
 * 
 * DEPENDENCIES:
 *   - @testing-library/react: for accessing the HTML DOM in tests
 *   - next-auth/react: for wrapping page in SessionProvider
 *   - components/Header: component to test
 *   - jest/testHelpers: for mocking session / logged in user
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import Header from '@/components/Header';
import { getMockSession } from '@/jest/testHelpers';

// Set up mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/Villagers',
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('Header Component', () => {

  it('displays main tabs', async () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );
    expect(screen.getByText('Villagers')).toBeInTheDocument();
    expect(screen.getByText('Items')).toBeInTheDocument();
    expect(screen.getByText('Tracker')).toBeInTheDocument();
  });

  it('displays subtabs when main tab is hovered over', async () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );

    // Simulate hover over tracker tab
    const trackerTab = screen.getByText('Tracker');
    fireEvent.mouseEnter(trackerTab);

    // Confirm subtabs are displayed
    await waitFor(() => {
      expect(screen.getByText('Museum')).toBeInTheDocument();
      expect(screen.getByText('Perfection')).toBeInTheDocument();
      expect(screen.getByText('Bundles')).toBeInTheDocument();
    });
  });
  
  it('displays prompt to log in when not logged in', async () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('displays prompt to log out when logged in', async () => {
    render(
      <SessionProvider session={getMockSession()}>
        <Header />
      </SessionProvider>
    );
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('renders tabs that are not the current page and do not have subtabs as links', async () => {
    render(
      <SessionProvider session={getMockSession()}>
        <Header />
      </SessionProvider>
    );
    expect(screen.queryByRole('link', { name: 'Items'})).toBeInTheDocument();
  });
  
  it('does not render tabs with subtabs as links', async () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );
    expect(screen.queryByRole('link', { name: 'Tracker'})).not.toBeInTheDocument();
  });

  it('does not render the current tab as a link', async () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );
    const villagersTab = screen.getByText('Villagers');
    expect(villagersTab?.getAttribute('href')).not.toBe('/Villagers');
  });

}); //end Items/[itemname] test suite