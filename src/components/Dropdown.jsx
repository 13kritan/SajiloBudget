import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function Dropdown({ label = "Dropdown", options = [], selected: controlledSelected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState(label); // store selected label
  const dropdownRef = useRef(null);

  const selected = controlledSelected ?? internalSelected; // controlled overrides internal
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt) => {
    if (!controlledSelected) setInternalSelected(opt.label); // only update internal if uncontrolled
    if (onSelect) onSelect(opt);                             // call parent callback if provided
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <Button onClick={() => setIsOpen((prev) => !prev)} className="flex items-center w-full" variant="secondary">
        {selected? selected: label} <FontAwesomeIcon icon={faAngleDown} />
      </Button>

      {isOpen && (
        <div className="absolute bottom-0 z-10 mt-2 w-44 bg-neutral-100 dark:bg-neutral-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg  max-h-50 overflow-y-auto">
          <ul className="p-2 text-sm text-gray-800 dark:text-gray-200 font-medium">
            {options.map((opt, index) => (
              <li key={index}>
                {opt.href ? (
                  <a

                    href={opt.href}
                    onClick={(e) => {
                      handleSelect(opt)
                      e.preventDefault()
                    }
                    }
                    className="flex items-center w-full p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800"
                  >
                    {opt.icon && <span className="mr-2">{opt.icon}</span>}
                    {opt.label}
                  </a>
                ) : (
                  <button
                    onClick={() => handleSelect(opt)}
                    className="flex items-center w-full p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-left"
                  >
                    {opt.icon && <span className="mr-2">{opt.icon}</span>}
                    {opt.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
