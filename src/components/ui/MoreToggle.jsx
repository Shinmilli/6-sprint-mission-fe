"use client";

import React, { useEffect, useRef, useState } from "react";

function MoreToggle({ onPatch, onDelete }) {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const menuRef = useRef(null);

  const handleToggleClick = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsToggleOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative z-[0] flex flex-col items-end" ref={menuRef}>
        <button onClick={handleToggleClick}>
          <img src="/image/ui/more.png" className="w-[24px] h-[24px]" />
        </button>

        {isToggleOpen && (
          <div className="absolute bg-white top-[29px] z-[-1] w-[139px] h-[92px] border border-gray-300 rounded-[8px] flex flex-col justify-center gap-[16px]">
            <button onClick={onPatch}> 수정하기 </button>
            <button onClick={onDelete}> 삭제하기 </button>
          </div>
        )}
      </div>
    </>
  );
}

export default MoreToggle;
