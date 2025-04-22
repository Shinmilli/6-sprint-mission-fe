import Image from "next/image";
import searchIcon from "../../assets/images/icons/ic_search.svg"; // 경로는 실제 위치에 맞게 조정해줘

export default function Search() {
  return (
    <div className="w-full bg-[#F3F4F6] max-w-md flex items-center rounded-md px-3 py-2 bg-white">
      <Image
        src={searchIcon}
        alt="search icon"
        width={16}
        height={16}
        className="mr-2"
      />
      <input
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        className="w-full border-none outline-none text-sm text-gray-900 placeholder-gray-400 bg-transparent"
      />
    </div>
  );
}
