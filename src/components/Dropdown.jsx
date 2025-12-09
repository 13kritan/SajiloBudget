import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function Dropdown({ label = "Dropdown", options = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label); // store selected label
  const dropdownRef = useRef(null);

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
    if (opt.label) setSelected(opt.label); // update button label
    setIsOpen(false);                      // close dropdown
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <Button onClick={() => setIsOpen((prev) => !prev)} className="flex items-center w-full" variant="secondary">
        {selected} <FontAwesomeIcon icon={faAngleDown} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-44 bg-neutral-100 dark:bg-neutral-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
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
