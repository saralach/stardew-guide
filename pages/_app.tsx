/**
 * MODULE:  pages/_app.jsx
 * 
 * SUMMARY:
 *   Base configuration that applies to all pages. More specifically:
 *   - Applies global styling & font to all pages.
 *   - Makes session data available across all pages.
 *   - Adds the page header to all pages.
 * 
 * DEPENDENCIES:
 *   - next-auth: for Session type
 *   - next-auth/react: for supplying session
 *   - next/app: For AppProps type
 *   - next/font/google: for using google fonts
 *   - components/Header: for adding header page to all pages
 *   - styles/globals: for styling that applies to all pages
 */

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Inter } from 'next/font/google';
import Header from "@/components/Header";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

type SessionAppProps = AppProps & {
  pageProps: {
    session: Session | null;
  };
};

export default function App({ Component, pageProps: { session, pageProps } }: SessionAppProps) {
  return (
    <SessionProvider session={session}>
      <div className={inter.className}>
        <Header/>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
