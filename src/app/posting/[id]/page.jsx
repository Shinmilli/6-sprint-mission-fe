"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/posting/InputField";
import { useRouter } from "next/navigation";
import { getArticle, patchArticle } from "@/lib/api/article";

function page({ params }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const { id: articleId } = React.use(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArticle(articleId);
        setTitle(data.title);
        setContent(data.content);
      } catch (e) {
        console.error("게시글 로딩 실패", e);
      }
    };

    fetchData();
  }, [articleId]);

  const handlePost = async () => {
    try {
      const patchData = {
        title: title,
        content: content,
      };

      await patchArticle(articleId, patchData);
      router.push(`/articles/${articleId}`);
    } catch (e) {
      console.error("게시글 수정 중 에러 발생", e);
    }
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  return (
    <div className="flex items-center justify-center">
      <div className="pt-[94px] flex flex-col w-[1200px]">
        <div className="flex flex-row justify-between mb-[32px]">
          <div className="font-pretendard font-bold text-[20px]">
            게시글 수정
          </div>
          <Button
            text={"수정"}
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

export default page;
