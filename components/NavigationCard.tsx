/**
 * MODULE:  components/NavigationCard
 * 
 * SUMMARY:
 *   Displays a link to a page styled like a button. For use on the home page.
 *
 * DEPENDENCIES:
 *   - next/image: for optimized image rendering
 *   - next/link: navigation
 *   - styles/Home: styling
 * 
 * USED BY:
 *   - pages/index.tsx (home page)
 */

import Image from "next/image";
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

type PageTypes = "TRACKER" | "INFO";

interface NavigationCardProps {
  href: string;
  pageType: PageTypes;
  label: string;
  imgSrc: string;
  imgAlt: string;
  imgWidth: number;
  imgHeight?: number;
}

function NavigationCard({href, pageType, label, imgSrc, imgAlt, imgWidth, imgHeight}:
    NavigationCardProps) {

  const isTracker = pageType === "TRACKER";

  // Confirm all paths have the required '/' at start
  function confirmPathValidity(path: string) {
    if(path.charAt(0) != '/')
      path = `/${path}`;
  }
  confirmPathValidity(href);
  confirmPathValidity(imgSrc);

  // If height not specified, set height same as width
  imgHeight = imgHeight ? imgHeight : imgWidth; 

  // ========================== RETURN ==========================
  return (
    <Link href={href} className={`${styles.imglinkbtn} ${isTracker && styles.tracker}`}>
      <span className={styles.imglinknote}>{pageType}</span>
      <div className={styles.imgcontainer}>
        <Image 
          className={styles.itemimg}
          src={imgSrc}
          alt={imgAlt}
          width={imgWidth}
          height={imgHeight}
        />
      </div>
      <p>{label}</p>
    </Link>
  )
}

export default NavigationCard;