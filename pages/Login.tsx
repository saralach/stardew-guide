import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import styles from '@/styles/Login.module.css';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const minUserLength = 4;  const maxUserLength = 20;
  const minPassLength = 8;  const maxPassLength = 30;

  function switchMenu() {
    setIsLogin(!isLogin);
  }

  // ============ validateCredentialLengths() ==============================
  const validateCredentialLengths = (username: string, password: string): boolean => {
    let validLengths = true;
    if(username.length < minUserLength || username.length > maxUserLength) {
      setMessage(`Usernames must be ${minUserLength}–${maxUserLength} characters long.`);
      validLengths = false;
    }
    else if(password.length < minPassLength || password.length > maxPassLength) {
      setMessage(`Passwords must be ${minPassLength}–${maxPassLength} characters long.`);
      validLengths = false;
    }
    return validLengths;
  }

  // ============ handleSubmit() ===========================================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Confirm credentials exist
    if(!username || !password) {
      setMessage('Please enter username and password.');
      return;
    }

    // Check if credentials meet length requirements
    const validCredentialLengths = validateCredentialLengths(username, password);

    if(isLogin) {
      if(validCredentialLengths) {
        // Attempt to sign in
        const res = await signIn('credentials', {
          redirect: false,
          username,
          password,
        });
    
        if (res?.error)
          setMessage(res.error);
        else
          router.push('/'); //Redirect to home page
      }
      else
        setMessage("Invalid credentials.");
    }
    else { 
      // Attempt to register
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await res.json();
  
      if (res.status === 201) {
        // Automatically sign the user in after successful registration
        const signInResponse = await signIn('credentials', {
          redirect: false,
          username,
          password,
        });

        if (signInResponse?.error)
          setMessage('Failed to log in after registration.');
        else
          router.push('/');
      }
      else
        setMessage(data.message);
    }
  }; //end handleSubmit()

  // ============ Return page content ======================================
  if(status === 'authenticated')
    return <p data-testid='logged-in-msg'>{`Silly ${session.user.username}, you are already logged in!`}</p>
  return (
    <>
      <Head>
        <title>Page Not Found | Stardew Guide</title>
      </Head>
      <main className={styles.logincontainer}>
        <div className={styles.tabcontainer}>
          <button 
            disabled={!isLogin}
            onClick={switchMenu}
            className={styles.tab}
            data-testid='register-tab'
          >
            Register
          </button>
          <button 
            disabled={isLogin}
            onClick={switchMenu}
            className={styles.tab}
            data-testid='login-tab'
          >
            Login
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            type='submit'
            data-testid='submit-btn'
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        {
          message && <p data-testid='message'>{message}</p>
        }
      </main>
    </>

  );
}