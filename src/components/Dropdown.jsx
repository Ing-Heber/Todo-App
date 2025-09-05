import {useState, useRef, useEffect} from "react";
import PropTypes from "prop-types";

export const Dropdown = ({btnClasses, btnText, dropdownId, dropdownType, handleShowTodosBy, items}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(0);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const itemRefs = useRef([]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setFocusedIndex(-1);
    };

    const closeDropdown = () => {
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
    };

    const handleSelect = (index) => {
        setSelected(index);
        handleShowTodosBy(items[index].value);
        closeDropdown();
    };

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                closeDropdown();
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (isOpen && focusedIndex >= 0) {
                    handleSelect(focusedIndex);
                } else {
                    toggleDropdown();
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                    setFocusedIndex(0);
                } else {
                    setFocusedIndex((prev) =>
                        prev < items.length - 1 ? prev + 1 : 0
                    );
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (isOpen) {
                    setFocusedIndex((prev) =>
                        prev > 0 ? prev - 1 : items.length - 1
                    );
                }
                break;
            case 'Tab':
                if (isOpen) {
                    closeDropdown();
                }
                break;
            default:
                break;
        }
    };

    const handleItemKeyDown = (e, index) => {
        switch (e.key) {
            case 'ArrowUp':
                if (index <= 0) setFocusedIndex(items.length - 1);
                setFocusedIndex(index - 1);
                break;

            case 'ArrowDown':
                if (index >= items.length - 1) setFocusedIndex(0);
                setFocusedIndex(index + 1);
                break;

            case 'Enter':
            case ' ':
                e.preventDefault();
                handleSelect(index);
                break;
            case 'Escape':
                e.preventDefault();
                closeDropdown();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
            itemRefs.current[focusedIndex].focus();
        }
    }, [focusedIndex, isOpen]);

    return (
        <div className="dropdown" ref={dropdownRef} aria-label={`${dropdownType} dropdown`}>
            <button
                ref={buttonRef}
                className={`btn__text--primary dropdown__toggle ${btnClasses}`}
                onClick={toggleDropdown}
                onKeyDown={handleKeyDown}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls={dropdownId}
                aria-label={`${btnText}, current selection: ${items[selected].label}`}
            >
                <span className="d-md-block">{btnText}</span>
                <p className="count small">{items[selected].label}</p>
            </button>

            {isOpen && (
                <div
                    id={dropdownId}
                    className="dropdown__container show"
                    role="listbox"
                    aria-labelledby={dropdownId}
                >
                    {items.map((item, index) => (
                        <button
                            key={`${item.value}-${index}`}
                            ref={(el) => (itemRefs.current[index] = el)}
                            className={`dropdown__item ${selected === index ? 'active' : ''} ${
                                focusedIndex === index ? 'focused' : ''
                            }`}
                            onClick={() => handleSelect(index)}
                            onKeyDown={(e) => handleItemKeyDown(e, index)}
                            role="option"
                            aria-selected={selected === index}
                            tabIndex={0}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

Dropdown.propTypes = {
    btnClasses: PropTypes.string,
    btnText: PropTypes.string.isRequired,
    dropdownId: PropTypes.string.isRequired,
    dropdownType: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
    ).isRequired,
    handleShowTodosBy: PropTypes.func.isRequired,
};
