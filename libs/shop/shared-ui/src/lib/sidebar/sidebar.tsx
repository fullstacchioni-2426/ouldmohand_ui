import React, { useState } from 'react';
import styles from './sidebar.module.css';

interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: SidebarItem[];
}

interface SidebarProps {
  items: SidebarItem[];
  isOpen?: boolean;
  onToggle?: () => void;
  width?: number;
  className?: string;
}

export function Sidebar({
  items,
  isOpen = true,
  onToggle,
  width = 280,
  className = ''
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const sidebarClasses = [
    styles.sidebar,
    isOpen && styles.open,
    className
  ].filter(Boolean).join(' ');

  const renderItems = (items: SidebarItem[], level = 0) => {
    return items.map(item => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedItems.has(item.id);

      return (
        <li key={item.id} className={styles.sidebarItem}>
          <button
            className={`${styles.sidebarButton} ${level > 0 ? styles.nested : ''}`}
            onClick={() => {
              if (hasChildren) {
                toggleExpanded(item.id);
              } else if (item.onClick) {
                item.onClick();
              }
            }}
            style={{ paddingLeft: `${20 + level * 16}px` }}
          >
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            <span className={styles.label}>{item.label}</span>
            {hasChildren && (
              <span className={`${styles.arrow} ${isExpanded ? styles.expanded : ''}`}>
                ▶
              </span>
            )}
          </button>
          {hasChildren && isExpanded && (
            <ul className={styles.submenu}>
              {renderItems(item.children!, level + 1)}
            </ul>
          )}
        </li>
      );
    });
  };

  return (
    <aside
      className={sidebarClasses}
      style={{ width: isOpen ? `${width}px` : '0px' }}
    >
      <div className={styles.sidebarContent}>
        <ul className={styles.sidebarList}>
          {renderItems(items)}
        </ul>
      </div>
      {onToggle && (
        <button
          className={styles.toggleButton}
          onClick={onToggle}
          aria-label="Toggle sidebar"
        >
          {isOpen ? '◀' : '▶'}
        </button>
      )}
    </aside>
  );
}