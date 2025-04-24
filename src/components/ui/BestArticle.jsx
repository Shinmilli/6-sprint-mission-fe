"use client";

import React from "react";

function BestArticle({ title, createdAt }) {
  // 날짜 prettier
  const formatDate = (iso) => {
    const date = new Date(iso);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <div className="bg-sixth px-[24px] pb-[16px] ">
      <img src="/image/ui/articleBadge.png" className="w-[102px] h-[30px]" />
      <div className="w-[336px]">
        <div className="flex flex-row justify-between mt-[16px] mb-[18px]">
          <div className="font-bold text-[20px]">{title} </div>
          <img src="/image/ui/macbook.png" />
        </div>

        <div className="flex flex-row justify-between">
          <div className="flex justify-between items-center w-[133px] text-[14px]">
            <div> 총명한 판다 </div>
            <img
              src="/image/ui/likeHeart.png"
              className="w-[13.4px] h-[11.65px]"
            />
            <div> 9999+ </div>
          </div>

          <div className="font-[400] text-[14px] text-fifth">
            {formatDate(createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestArticle;
