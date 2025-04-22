async function Comment({ content }) {
  return (
    <>
      <div className="h-[104px] mt-[24px] pb-[16px] border-b border-seven">
        <div className="flex flex-row w-[1200px] justify-between">
          <div className="text-[20px]"> {content} </div>
          <div>...</div>
        </div>

        <div className="flex flex-row  items-center gap-[8px] ">
          <img src="/image/ui/profile.png" className="w-[24px] h-[24px]" />
          <div>
            <div> 총명한 판다 </div>
            {/* 시간 계산 필요 */}
            <div>1시간 전</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;