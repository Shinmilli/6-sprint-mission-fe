// 게시글 3개 가져옴
export async function getBestArticles() {
  const res = await fetch(`http://localhost:3000/articles?take=3`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("베스트 게시글 목록을 가져오는데 실패했습니다");
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

//게시글 목록 가져옴
export async function getArticles() {
  const res = await fetch(`http://localhost:3000/articles?take=4`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("게시글 목록을 가져오는데 실패했습니다");
  }

  return res.json();
}

//특정 게시글 조회
export async function getArticle(articleId) {
  const res = await fetch(`http://localhost:3000/articles/${articleId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("해당 게시글을 가져올 수 없습니다.");
  }
  return res.json();
}

//게시글 등록하기
export async function postArticle(postData) {
  const res = await fetch("http://localhost:3000/articles", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!res.ok) throw new Error("게시글 등록 실패");

  return res.json();
}

//게시글 수정하기
export async function patchArticle(articleId, patchData) {
  const res = await fetch(`http://localhost:3000/articles/${articleId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(patchData),
  });

  if (!res.ok) throw new Error("해당 게시글이 존재하지 않습니다.");

  return res.json();
}

//게시글 삭제하기
export async function deleteArticle(articleId) {
  const res = await fetch(`http://localhost:3000/articles/${articleId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("해당 게시글을 삭제할 수 없습니다.");
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
