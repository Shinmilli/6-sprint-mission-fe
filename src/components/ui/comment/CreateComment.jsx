"use client";

import React, { useState } from "react";
import InputField from "../posting/InputField";
import Button from "../Button";
import { getComments, postComment } from "@/lib/api/comment";
import { preconnect } from "react-dom";

function CreateComment({
  articleId,
  onCommentAdded,
  onSubmit,
  text = "댓글달기",
  prevComment = "",
}) {
  const [content, setContent] = useState(prevComment);

  // const fetchComments = async () => {
  //   const res = await getComments(articleId);

  // };

  const handlePost = async () => {
    try {
      if (onSubmit) {
        await onSubmit(content);
      } else {
        const postData = {
          content: content,
        };
        await postComment(articleId, postData);
      }
      setContent("");
      onCommentAdded?.();
    } catch (e) {
      console.error("댓글 등록 중 에러 발생", e);
    }
  };

  const handleContent = (e) => setContent(e.target.value);

  return (
    <div className="pt-[32px] pb-[40px]">
      <div className="font-[600] text-[20px] mb-[9px] ">{text}</div>
      <div className="mb-[16px]">
        <InputField
          placeholder={"댓글을 입력해주세요."}
          height={"h-[104px]"}
          value={content}
          onChange={handleContent}
        />
      </div>
      <div className="flex flex-row justify-end">
        <Button
          text={"등록"}
          onClick={handlePost}
          disabled={!content}
          width={"w-[74px]"}
          height={"h-[42px]"}
        />
      </div>
    </div>
  );
}

export default CreateComment;
