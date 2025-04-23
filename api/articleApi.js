export async function getArticleDetail(articleId) {
  if (!articleId) {
    throw new Error("Invalid article ID");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${articleId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch article detail:", error);
    throw error;
  }
}

export async function getArticleComments({ articleId, take = 10, cursor }) {
  if (!articleId) {
    throw new Error("Invalid article ID");
  }

  const params = {
    take,
    ...(cursor && { cursor }), // cursor가 존재할 때만 추가
  };

  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${articleId}/comments?${query}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch article comments:", error);
    throw error;
  }
}

export async function createArticle({ title, content, image }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          image: image || "", // 이미지가 없다면 빈 문자열을 전송
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // 성공적으로 생성된 게시글 데이터 반환
  } catch (error) {
    console.error("Failed to create article:", error);
    throw error;
  }
}
export async function updateArticle({ id, title, content }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedArticle = await response.json();
    return updatedArticle; // 성공적으로 수정된 게시글 데이터 반환
  } catch (error) {
    console.error("Failed to update article:", error);
    throw error;
  }
}
export async function deleteArticle(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true; // 성공적으로 삭제된 경우 true 반환
  } catch (error) {
    console.error("Failed to delete article:", error);
    throw error;
  }
}

export async function createComment({ articleId, content }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${articleId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // 성공적으로 생성된 댓글 데이터 반환
  } catch (error) {
    console.error("Failed to create comment:", error);
    throw error;
  }
}
