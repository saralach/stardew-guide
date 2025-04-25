/**
 * MODULE:  pages/_document.tsx
 * 
 * SUMMARY:
 *   Customizes the basic HTML structure that is applied to all pages.
 * 
 * DEPENDENCIES:
 *   - next-auth/react: for Html, Head, Main, and NextScript components
 */

import { Html, Head, Main, NextScript } from "next/document";

/* NOTE TO SELF: 
  The <Main /> component is what gets replaced with the content for the specific page.
  (It has nothing to do with the HTML element <main>.)
*/

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
