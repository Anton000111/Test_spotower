'use client'
import styles from './Header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navigation } from '../Navigation';
import { LinkButton } from '../LinkButton';
import { Button } from '../Button';
import headerIcon from '@/public/coffee.svg';
import locationIcon from '@/public/location.svg';
import menuIcon from '@/public/menu.svg';
import { useUser } from '@/contexts';

const navItems = [
  { label: 'Menu', href: '/menu' },
  { label: 'Rewards', href: '/rewards' },
  { label: 'Gift cards', href: '/giftcards' },
];

const Header = () => {
  const pathname = usePathname();
  const { user, logOut } = useUser();

  if (pathname.includes('/account') || pathname.includes('/admin')) {
    return (
      <header className={styles.header}>
        <nav className={styles.container} style={{ maxWidth: '100%' }}>
          <Link href="/">
            <Image priority src={headerIcon} alt="logo" width="50" height="50" className={styles.logo} />
          </Link>
        </nav>
      </header>
    )
  }


  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <div className={styles.separateContainer}>
          <Link href="/" className={styles.logoContainer}>
            <Image priority src={headerIcon} alt="logo" width="50" height="50" className={styles.logo} />
          </Link>
          <div className={"desktop " + styles.navContainer}><Navigation navItems={navItems} /></div>
        </div>
        <div className="desktop">
          <div className={styles.tail}>
            <LinkButton icon={locationIcon} href="/" label="Find a store" />
            {user ? <Button label="Log out" onClick={logOut} /> :
              <>
                <Link href="/account/signin">
                  <Button label="Sign in" outline color="#000" />
                </Link>
                <Button label="Join now" />
              </>}
          </div>
        </div>
        <button className="mobile"><Image priority src={menuIcon} alt="menu" width="24" height="24"/></button>
      </nav>
    </header>
  );
};

export default Header;