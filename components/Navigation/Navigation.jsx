'use client'
import { useState } from "react";
import styles from './Navigation.module.css';
import Link from "next/link";

const Navigation = ({ navItems }) => {
  const [currentItemHref, setCurrentItemHref] = useState('');

  const items = navItems.map(({ label, href }) => {
    let tabClassName = styles.tab

    if (href === currentItemHref) tabClassName = tabClassName + ' ' + styles.activeTab

    return (
      <div key={href} className={tabClassName}>
        <Link className={styles.tabButton} onClick={() => setCurrentItemHref(href)} href="/">{label.toUpperCase()}</Link>
      </div>
    )
  });

  return <nav className={styles.tabContainer}>{items}</nav>;
};

export default Navigation;
