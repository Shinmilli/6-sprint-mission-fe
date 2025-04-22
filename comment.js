//해당 게시물의 댓글 목록 가져오기
export async function getComments(articleId) {
  const res = await fetch(
    `http://localhost:3000/articles/${articleId}/comments`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("해당 게시글의 댓글 목록을 가져오는데 실패했습니다");
  }

  return res.json();
}