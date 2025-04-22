"use client";

import { useState } from "react";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-300"
      >
        최신순
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <ul className="py-1 text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              항목 1
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              항목 2
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
