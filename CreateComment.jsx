"use client";

import React from "react";
import {Input} from "./Input";
//import Button from "./Button";

function CreateComment() {
  const handlePost = () => {
    console.log("now comment post");
  };

  return (
    <div className="pt-[32px] pb-[40px]">
      <div className="font-[600] text-[20px] mb-[9px] ">댓글달기</div>
      <div className="mb-[16px]">
        <Input placeholder={"댓글을 입력해주세요."} height={"h-[104px]"} />
      </div>
      <div className="flex flex-row justify-end">
        <button
          onClick={handlePost}
          disabled={true}
          width={"w-[74px]"}
          height={"h-[42px]"}
        >등록</button>
      </div>
    </div>
  );
}

export default CreateComment;