export async function updateComment({ commentId, content }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/${commentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      }
    );

    if (!response.ok) {
      throw new Error("댓글 수정 실패");
    }

    const updatedComment = await response.json();
    return updatedComment;
  } catch (error) {
    console.error("Failed to update comment:", error);
    throw error;
  }
}

export async function deleteComment(commentId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true; // 성공적으로 삭제되었음을 나타내는 값 반환
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
    throw error;
  }
}
