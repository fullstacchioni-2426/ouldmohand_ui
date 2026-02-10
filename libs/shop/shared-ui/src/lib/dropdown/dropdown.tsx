import React, { useState, useRef, useEffect } from 'react';
import styles from './dropdown.module.css';

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  divider?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onSelect: (value: string) => void;
  trigger?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  maxHeight?: number;
  searchable?: boolean;
}

export function Dropdown({
  options,
  value,
  onSelect,
  trigger,
  placeholder = 'Select option...',
  disabled = false,
  className = '',
  maxHeight = 200,
  searchable = false
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find(opt => opt.value === value);
  
  const filteredOptions = searchable && searchTerm
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearchTerm('');
      }
    }
  };

  const handleSelect = (optionValue: string) => {
    onSelect(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const dropdownClasses = [
    styles.dropdown,
    isOpen && styles.open,
    disabled && styles.disabled,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={dropdownClasses} ref={dropdownRef}>
      {trigger ? (
        <div onClick={handleToggle} className={styles.customTrigger}>
          {trigger}
        </div>
      ) : (
        <button
          className={styles.trigger}
          onClick={handleToggle}
          disabled={disabled}
          type="button"
        >
          <span className={styles.triggerText}>
            {selectedOption?.label || placeholder}
          </span>
          <span className={`${styles.arrow} ${isOpen ? styles.up : ''}`}>
            ▼
          </span>
        </button>
      )}

      {isOpen && (
        <div 
          className={styles.menu}
          style={{ maxHeight: `${maxHeight}px` }}
        >
          {searchable && (
            <div className={styles.searchContainer}>
              <input
                ref={searchInputRef}
                type="text"
                className={styles.searchInput}
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          
          <div className={styles.optionsList}>
            {filteredOptions.length === 0 ? (
              <div className={styles.noOptions}>No options found</div>
            ) : (
              filteredOptions.map((option, index) => (
                <React.Fragment key={option.value}>
                  {option.divider && <div className={styles.divider} />}
                  <button
                    className={`${styles.option} ${
                      option.value === value ? styles.selected : ''
                    } ${option.disabled ? styles.optionDisabled : ''}`}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                    disabled={option.disabled}
                    type="button"
                  >
                    {option.label}
                  </button>
                </React.Fragment>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}