import React from "react";
import ArticleHeader from "@/components/ui/ArticleHeader";
import Articles from "@/components/ui/Articles";
import BestList from "@/components/ui/BestList";

function articles() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[1200px] flex flex-col pt-[94px] font-pretendard">
        <BestList />

        <div>
          <ArticleHeader />
          <Articles />
        </div>
      </div>
    </div>
  );
}

export default articles;
