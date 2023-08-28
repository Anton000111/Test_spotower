'use client'
import Link from "next/link";
import Image from 'next/image';
import styles from './LinkButton.module.css';

const LinkButton = ({ icon, label, href  }) => {
  if (icon) {
    return (
      <div className={styles.container}>
        <Image className={styles.text} src={icon} alt="icon" width="32" height="32" />
        <Link className={styles.text} href="/">{label}</Link>
      </div>
    )
  }

  return (
    <Link className={styles.text} onClick={() => setCurrentItemHref(href)} href="/">{label}</Link>
  )
};

export default LinkButton;
