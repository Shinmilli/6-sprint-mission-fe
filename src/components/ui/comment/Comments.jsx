"use client";

import { getComments } from "@/lib/api/comment";
import Comment from "./Comment";
import { useEffect, useState } from "react";

export default function Comments({ articleId, refreshTrigger }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    const res = await getComments(articleId);
    console.log("res", res);
    setComments(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [articleId, refreshTrigger]);

  if (loading) return <div> 댓글 로딩중... </div>;

  if (comments.length === 0)
    return (
      <div className="flex flex-row justify-center">
        <img src="/image/ui/noComment.png" />
      </div>
    );

  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          commentId={comment.id}
          articleId={articleId}
          content={comment.content}
          refreshComments={fetchComments}
        />
      ))}
    </div>
  );
}
