"use client";

import React from "react";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Search from "@/components/ui/Search";
import { useRouter } from "next/navigation";

export default function ArticleHeader() {
  const router = useRouter();

  //글쓰기 버튼 클릭 시 페이지 이동
  const handlePost = () => {
    router.push("/posting");
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between mt-[40px] mb-[24px]">
        <div className="font-bold text-[20px]">게시글</div>

        <Button
          text="글쓰기"
          onClick={handlePost}
          disabled={false}
          width={"w-[88px]"}
          height={"h-[42px]"}
        />
      </div>

      <div className="relative flex flex-row justify-between">
        <Search />
        <Dropdown />
      </div>
    </>
  );
}
