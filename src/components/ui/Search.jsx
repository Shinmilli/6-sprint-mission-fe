"use client";

import { useArticles } from "@/providers/ArticlesProvider";
import React from "react";

function Search() {
  const { searchTerm, setSearchTerm } = useArticles();

  //검색어 입력
  const handleChange = (e) => setSearchTerm(e.target.value);

  return (
    <div>
      <img
        className="absolute top-[8px] left-[13px]"
        src="image/ui/돋보기.png"
        alt="돋보기 아이콘"
      />

      <input
        className={
          "w-[1054px] h-[42px] border-0 rounded-[12px] bg-third pl-[44px] text-[16px]"
        }
        placeholder="검색할 상품을 입력해주세요"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
