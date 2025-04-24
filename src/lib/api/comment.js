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

//댓글 등록하기
export async function postComment(articleId, postData) {
  const res = await fetch(
    `http://localhost:3000/articles/${articleId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(postData),
    }
  );
  if (!res.ok) throw new Error("댓글 등록 실패");

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

//댓글 수정하기
export async function patchComment(commentId, patchData) {
  const res = await fetch(`http://localhost:3000/comments/${commentId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(patchData),
  });

  if (!res.ok) throw new Error("댓글 수정 실패");
  return res.json();
}

//댓글 삭제하기
export async function deleteComment(commentId) {
  const res = await fetch(`http://localhost:3000/comments/${commentId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("댓글 삭제 실패");
}
