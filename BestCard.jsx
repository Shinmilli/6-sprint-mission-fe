"use client";

import Image from "next/image";
import macbookImg from "@/src/assets/images/macbook.png";
import trophyIcon from "@/src/assets/images/icons/ic_trophy.png";
import heartIcon from "@/src/assets/images/icons/ic_heart.svg";

export default function BestCard({ title, imageUrl, createdAt }) {
  const formatDate = (iso) => {
    const date = new Date(iso);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <div
      style={{ width: 384, height: 169 }}
      className="bg-[#F9FAFB] rounded-xl p-4 space-y-3 w-full max-w-sm text-gray-900"
    >
      {/* Badge */}
      <div className="inline-flex items-center bg-[#3692ff] text-[#fff] text-xs font-semibold rounded-b-[10px] px-2 py-1">
        <Image src={trophyIcon} alt="trophy" width={14} height={14} className="mr-1" />
        Best
      </div>

      {/* Title + Image */}
      <div className="flex justify-between items-start">
        <div className="flex-1 mr-3 text-base leading-snug">
          {title}
        </div>
        <Image
          src={imageUrl || macbookImg}
          alt="thumbnail"
          width={72}
          height={72}
          className="object-cover rounded-md"
        />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end text-xs text-gray-500">
        <span>총명한판다</span>
        <span className="flex items-center space-x-1">
          <Image src={heartIcon} alt="heart" width={13.4} />
          <span>9999+</span>
        </span>
        <span>{formatDate(createdAt)}</span>
      </div>
    </div>
  );
}
