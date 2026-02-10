import React from 'react';
import styles from './navbar.module.css';

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

interface NavbarProps {
  brand?: string;
  items?: NavItem[];
  className?: string;
  theme?: 'light' | 'dark';
  sticky?: boolean;
}

export function Navbar({
  brand = 'Brand',
  items = [],
  className = '',
  theme = 'light',
  sticky = true
}: NavbarProps) {
  const navbarClasses = [
    styles.navbar,
    styles[theme],
    sticky && styles.sticky,
    className
  ].filter(Boolean).join(' ');

  const handleItemClick = (item: NavItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      window.location.href = item.href;
    }
  };

  return (
    <nav className={navbarClasses}>
      <div className={styles.container}>
        <div className={styles.brand}>
          {brand}
        </div>
        
        <ul className={styles.navList}>
          {items.map((item, index) => (
            <li key={index} className={styles.navItem}>
              <button
                className={`${styles.navLink} ${item.active ? styles.active : ''}`}
                onClick={() => handleItemClick(item)}
                type="button"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        
        <div className={styles.hamburger}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}