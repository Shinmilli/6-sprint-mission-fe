"use client";

import Image from "next/image";
import heartIcon from "@/src/assets/images/icons/ic_heart.svg";
import profileIcon from "@/src/assets/images/icons/ic_profile.png";
import macbookImg from "@/src/assets/images/macbook.png"; // Fallback image

export default function BoardList({ title, createdAt, imageUrl }) {
  const formatDate = (iso) => {
    const date = new Date(iso);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <div className="w-full border-b border-gray-200 py-4">
      <div className="flex items-start justify-between">
        {/* Title and meta info */}
        <div className="flex-1 pr-4">
          <div className="text-[15px] text-gray-900 font-medium mb-2">
            {title}
          </div>
          <div className="flex items-center text-xs text-gray-400 space-x-2">
            <Image
              src={profileIcon}
              alt="user"
              width={16}
              height={16}
              className="rounded-full"
            />
            <span>총명한 판다</span>
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>

        {/* Thumbnail image */}
        <div className="flex-shrink-0">
          <Image
            src={imageUrl || macbookImg}
            alt="thumbnail"
            width={72}
            height={72}
            className="rounded-md object-cover"
          />
        </div>
      </div>

      {/* Likes */}
      <div className="flex justify-end items-center text-xs text-gray-400 mt-2 space-x-1">
        <Image src={heartIcon} alt="heart" width={14} height={14} />
        <span>9999+</span>
      </div>
    </div>
  );
}
