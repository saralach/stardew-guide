import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '@/pages/Login';
import { SessionProvider } from 'next-auth/react';

// Set up mock
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Import AFTER creating mock so mock version is imported rather than real implementation
import { useRouter } from 'next/router';

// ========================== Login Page Test Suite =============================
describe('Login Page', () => {

  const mockPush = jest.fn();

  // Runs before each test; sets up mock useRouter
  beforeEach( () => {
    mockPush.mockClear();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    });
  });



  // ======================== UNauthenticated User Tests ========================
  describe('Unauthenticated User', () => {

    beforeEach(() => {
      // Render Login page, simulating a user who is not logged in
      render(
        <SessionProvider session={null}> 
          <Login />
        </SessionProvider>
      );
    })

    it('allows users to input username and password', () => {
      // Get username & password input fields ("/StrHere/i" is reg exp for case-insensitive string)
      const usernameInput = screen.getByPlaceholderText(/Username/i) as HTMLInputElement;
      const passwordInput = screen.getByPlaceholderText(/Password/i) as HTMLInputElement;
      
      // Add input to fields
      fireEvent.change(usernameInput, { target: { value: 'test123' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      // Test if fields have input
      expect(usernameInput.value).toBe('test123');
      expect(passwordInput.value).toBe('password123');
    });

    // ------- Test Input Validation Functionality ----------------------------
    describe('Input Validation -- Login Tab', () => {

      it('shows an error message when user submits without entering any credentials', async () => {
        fireEvent.click(screen.getByTestId('submit-btn'));
        await waitFor(() => expect(screen.getByTestId('message'))
          .toHaveTextContent('Please enter username and password.'))
      });

      it('shows an error message when user submits without entering a username', async () => {
        const passwordInput = screen.getByPlaceholderText(/Password/i) as HTMLInputElement;
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        fireEvent.click(screen.getByTestId('submit-btn'));
        await waitFor(() => expect(screen.getByTestId('message'))
          .toHaveTextContent('Please enter username and password.'))
      });

      it('updates message when user submits without entering a password', async () => {
        const usernameInput = screen.getByPlaceholderText(/Username/i) as HTMLInputElement;
        fireEvent.change(usernameInput, { target: { value: 'test123' } });

        fireEvent.click(screen.getByTestId('submit-btn'));
        await waitFor(() => expect(screen.getByTestId('message'))
          .toHaveTextContent('Please enter username and password.'))
      });
    });

    describe('Input Validation -- Register Tab', () => {

      beforeEach(() => {
        // Click 'Register' tab
        fireEvent.click( screen.getByTestId('register-tab') )
      });

      it('shows an error message when user submits without entering any credentials', async () => {
        fireEvent.click(screen.getByTestId('submit-btn'));
        await waitFor(() => expect(screen.getByTestId('message'))
          .toHaveTextContent('Please enter username and password.'))
      });

      it('shows an error message when user submits without entering a username', async () => {
        const passwordInput = screen.getByPlaceholderText(/Password/i) as HTMLInputElement;
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        fireEvent.click(screen.getByTestId('submit-btn'));
        await waitFor(() => expect(screen.getByTestId('message'))
          .toHaveTextContent('Please enter username and password.'))
      });

      it('updates message when user submits without entering a password', async () => {
        const usernameInput = screen.getByPlaceholderText(/Username/i) as HTMLInputElement;
        fireEvent.change(usernameInput, { target: { value: 'test123' } });

        fireEvent.click(screen.getByTestId('submit-btn'));
        await waitFor(() => expect(screen.getByTestId('message'))
          .toHaveTextContent('Please enter username and password.'))
      });
    });

    // ------- Test Login/Register Tabs Functionality -------------------------
    describe('Login/Register Tabs', () => {

      it('initially has enabled login tab button and disabled register tab button', () => {
        // Get tab buttons
        const loginTabBtn = screen.getByTestId('login-tab');
        const registerTabBtn = screen.getByTestId('register-tab');
  
        // Check that the buttons exist
        expect(loginTabBtn).toBeDefined();
        expect(registerTabBtn).toBeDefined();
  
        // Check that the buttons are correctly enabled/disabled
        expect(loginTabBtn).toBeDisabled();
        expect(registerTabBtn).toBeEnabled();
      });
  
  
      it('initially displays the login submit button', () => {
        const submitBtn = screen.getByTestId('submit-btn');
        
        // Check that the button exists & contains the correct text
        expect(submitBtn).toBeDefined();
        expect(submitBtn).toHaveTextContent('Login');
      });
  
  
      it('properly toggles to register upon clicking register tab', () => {
        // Get tab buttons & submit button
        const registerTabBtn = screen.getByTestId('register-tab');
        const loginTabBtn = screen.getByTestId('login-tab');
        const submitBtn = screen.getByTestId('submit-btn');
  
        // Confirm register tab is enabled, and click it
        expect(registerTabBtn).toBeEnabled();
        fireEvent.click(registerTabBtn);
  
        // Check that tab buttons are correctly enabled/disabled
        expect(loginTabBtn).toBeEnabled();
        expect(registerTabBtn).toBeDisabled();
  
        // Check that submit button has been updated
        expect(submitBtn).toHaveTextContent('Register');
      });
  
  
      it('properly toggles to register and back to login upon clicking tabs', () => {
        // Get tab buttons & submit button
        const registerTabBtn = screen.getByTestId('register-tab');
        const loginTabBtn = screen.getByTestId('login-tab');
        const submitBtn = screen.getByTestId('submit-btn');
  
        // Click Register tab
        expect(registerTabBtn).toBeEnabled();
        fireEvent.click(registerTabBtn);
  
        // Click Login tab
        expect(loginTabBtn).toBeEnabled();
        fireEvent.click(loginTabBtn);
  
        // Check that tab buttons are correctly enabled/disabled
        expect(loginTabBtn).toBeDisabled();
        expect(registerTabBtn).toBeEnabled();
  
        // Check that submit button has been updated
        expect(submitBtn).toHaveTextContent('Login');
      });
    })
  }); //end unauthenticated user tests

  // ========================= Authenticated User Tests =========================
  describe('Authenticated User', () => {

    const mockSession = {
      user: {
        username: "totallyRealUser"
      },
      expires: '2099-01-01T00:00:00.000Z'
    }

    beforeEach(() => {
      // Render Login page, simulating a user who is not logged in
      render(
        <SessionProvider session={mockSession}> 
          <Login />
        </SessionProvider>
      );
    })
    
    it('does not display form content to logged in user', () => {
      const buttons = screen.queryAllByRole('button');
      expect(buttons.length).toBe(0);
    });

    it('displays message to logged in user', () => {
      const loggedInMsg = screen.getByTestId('logged-in-msg');
      expect(loggedInMsg).toBeDefined();
    });

  }); //end authenticated user tests
  
})