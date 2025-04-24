import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-secondary w-full h-[160px] text-[16px]">
        <div
          className="pt-[32px] mx-[200px] flex flex-col
  md:mx-[32px] md:mb-[108px]
  sm:flex-col sm:h-[63px] sm:mx-[16px] sm:mb-[65px]"
        >
          <div className="w-full flex flex-row justify-between mb-0 sm:mb-[24px]">
            <p className="w-[120px] h-[19px] text-[1em] text-[#9ca3af] block">
              @codeit - 2024
            </p>
            <span className="w-[159px] h-[19px] flex flex-row justify-between cursor-pointer text-[#E5E7EB]">
              <a to="/privacy"> Privacy Policy </a>
              <a to="/faq">FAQ </a>
            </span>
            <span className="w-[116px] h-[20px] flex flex-row justify-between cursor-pointer">
              <a href="https://ko-kr.facebook.com/">
                <img src="/image/footer/Group.png" />
              </a>
              <a href="https://x.com/?mx=2">
                <img src="/image/footer/ic_twitter.png" />
              </a>
              <a href="https://www.youtube.com/">
                <img src="/image/footer/ic_youtube.png" />
              </a>
              <a href="https://www.instagram.com/">
                <img src="/image/footer/ic_instagram.png" />
              </a>
            </span>
          </div>

          <div className="w-full flex flex-row justify-between mb-0 sm:mb-[24px]">
            <p className="hidden sm:block text-[1em] text-[#9ca3af] sm:hidden">
              @codeit - 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
