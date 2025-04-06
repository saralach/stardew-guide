import Head from "next/head";
import Loading from "@/components/Loading";
import { useEffect, useState } from 'react';
import styles from "@/styles/404.module.css";

export default function Error404Page() {
  return (
    <>
      <Head>
        <title>Page Not Found | Stardew Guide</title>
      </Head>

      <div className={styles.container}>
        <img src="/404Error.png" alt="404 Error Image"/>
        <h1>Uh oh!</h1>
        <p>The page you're looking for doesn't exist.</p>
      </div>
    </>
  );

}// end AllVillagersPage()