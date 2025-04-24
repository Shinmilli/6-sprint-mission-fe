"use client";

import React from "react";
import Link from "next/link";
import Button from "../ui/Button";
import { usePathname, useRouter } from "next/navigation";
import { useNav } from "@/providers/NavIndexProvider";

function Header() {
  const router = useRouter();
  const pathName = usePathname();
  const { activePage, setActivePage } = useNav();

  const handelLogin = () => {
    router.push("/login");
  };

  return (
    <header className="fixed bg-white z-[1] w-full h-[70px] flex flex-col border-b border-gray-200">
      <div className="w-full h-[51px] pt-[9.5px] flex justify-around items-center text-[16px]">
        <div className="flex items-center cursor-pointer">
          <img
            className="w-[40px] h-[40.14px]"
            alt="작은 판다 얼굴"
            src="/image/header/작은 판다 얼굴.png"
          />
          <Link href={"/"}>
            <img
              className="flex justify-between cursor-pointer pl-[8.9px] w-[103px] h-[26px]"
              src="/image/header/판다마켓.png"
              alt="판다마켓"
            />
          </Link>

          <div className="flex justify-between w-[218px] ml-[47px] mr-[23px] font-pretendard font-bold">
            <Link href="/articles" onClick={() => setActivePage("/post")}>
              <div
                className={`h-[26px] text-[18px] ${
                  pathName === "/articles" || pathName === "/posting"
                    ? "text-primary"
                    : ""
                }`}
              >
                {" "}
                자유게시판{" "}
              </div>
            </Link>
            <Link href="/market">
              <div
                className={`h-[26px] text-[18px] ${
                  pathName === "/market" ? "text-primary" : ""
                } mr-[30px]`}
              >
                중고마켓
              </div>
            </Link>
          </div>
        </div>

        <Button
          text="로그인"
          onClick={handelLogin}
          disabled={false}
          width={"w-[88px]"}
          height={"h-[42px]"}
        />
      </div>
    </header>
  );
}

export default Header;
