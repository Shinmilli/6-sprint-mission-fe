import React from "react";

function Article({ title, createdAt }) {
  // 날짜 prettier
  const formatDate = (iso) => {
    const date = new Date(iso);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <div className="h-[138px] mt-[24px]">
      <div className="flex flex-row justify-between">
        <div className="font-[600] text-[20px]"> {title} </div>
        <img src="/image/ui/macbook.png" className="w-[72px] h-[72px]" />
      </div>

      <div className="flex flex-row justify-between text-[14px] pt-[16px] pb-[24px] border-b border-seven text-eight">
        <div className="flex flex-row  items-center gap-[8px] ">
          <img src="/image/ui/profile.png" className="w-[24px] h-[24px]" />
          <div> 총명한 판다 </div>
          <div className="font-[400] text-[14px] text-fifth">
            {formatDate(createdAt)}
          </div>
        </div>

        <div className="flex flex-row w-[82px] h-[26px] items-center justify-between">
          <img
            src="/image/ui/likeHeart.png"
            className="w-[20.1px] h-[17.48px]"
          />
          <div className="text-[16px]"> 9999+ </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
