import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";
import "@/styles/globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"] })

export default function App({ Component, pageProps: { session, pageProps } } ) {
  return (
    <SessionProvider session={session}>
      <div className={inter.className}>
        <Header/>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
