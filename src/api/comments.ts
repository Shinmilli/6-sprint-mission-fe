import axios from "./axios";

export async function patchComment(commentId: string, { content }: { content: string }) {
  const response = await axios.patch(`/comments/${commentId}`, { content });
  return response.data;
}

export async function deleteComment(commentId: string) {
  await axios.delete(`/comments/${commentId}`);
}
