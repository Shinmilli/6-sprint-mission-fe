import { getComments } from "@/src/lib/api/comment";
import React from "react";
import Comment from "./Comment";

async function Comments({ params }) {
  const { id: articleId } = await params;

  const res = await getComments(articleId);
  const comments = res.data;

  if (comments.length === 0)
    return (
      <div className="flex flex-row justify-center">
        <img src="/image/ui/noComment.png" />
      </div>
    );

  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} content={comment.content} />
      ))}
    </div>
  );
}

export default Comments;