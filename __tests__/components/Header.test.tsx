import { render, screen, waitFor,  fireEvent } from '@testing-library/react';
import Header from '@/components/Header';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getMockSession } from '@/jest/testHelpers';

// Set up mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

beforeEach(() => {
  jest.resetAllMocks();
  (useRouter as jest.Mock).mockReturnValue({pathname: '/Villagers'})
});

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

  it('displays tracker options when tracker tab is hovered over', async () => {
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