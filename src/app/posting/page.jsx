"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/posting/InputField";
import { postArticle } from "@/lib/api/article";
import { useRouter } from "next/navigation";

function PostingPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handlePost = async () => {
    console.log("posting is Done");

    const postData = {
      title: title,
      content: content,
    };

    try {
      const { id } = await postArticle(postData);
      setTitle("");
      setContent("");
      router.push(`/articles/${id}`);
    } catch (e) {
      console.error("게시글 등록 중 에러 발생", e);
    }
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  return (
    <div className="flex items-center justify-center">
      <div className="pt-[94px] flex flex-col w-[1200px]">
        <div className="flex flex-row justify-between mb-[32px]">
          <div className="font-pretendard font-bold text-[20px]">
            게시글 쓰기
          </div>
          <Button
            text={"등록"}
            onClick={handlePost}
            disabled={!title || !content}
            width={"w-[74px]"}
            height={"h-[42px]"}
          />
        </div>

        <div className="mb-[24px]">
          <div className="font-pretendard font-bold text-[20px] mb-[12px]">
            * 제목
          </div>
          <InputField
            value={title}
            onChange={handleTitleChange}
            placeholder={"제목을 입력해주세요"}
            height={"h-[56px]"}
          />
        </div>
        <div>
          <div className="font-pretendard font-bold text-[20px] mb-[12px]">
            * 내용
          </div>
          <InputField
            value={content}
            onChange={handleContentChange}
            placeholder={"내용을 입력해주세요"}
            height={"h-[282px]"}
          />
        </div>
      </div>
    </div>
  );
}

export default PostingPage;
