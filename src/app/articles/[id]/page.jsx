"use client";

import ArticleDetail from "@/components/ui/ArticleDetail";
import Button from "@/components/ui/Button";
import Comments from "@/components/ui/comment/Comments";
import CreateComment from "@/components/ui/comment/CreateComment";
import { getArticle } from "@/lib/api/article";
import React, { useEffect, useState } from "react";

export default function SpecifiedArticle({ params }) {
  const { id: articleId } = React.use(params);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshComments = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const fetchArticle = async () => {
    const data = await getArticle(articleId);
    setArticle(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticle();
  }, [articleId]);

  if (loading) return <div>게시글 로딩 중... </div>;

  return (
    <div className="flex items-center justify-center font-pretendard">
      <div className="pt-[94px]">
        <ArticleDetail articleId={articleId} article={article} />
        <CreateComment
          articleId={articleId}
          onCommentAdded={refreshComments}
          refreshTrigger={refreshTrigger}
        />
        <Comments articleId={articleId} refreshTrigger={refreshTrigger} />
        <div className="flex justify-center mt-[64px]">
          <Button
            text={"목록으로 돌아가기"}
            disabled={false}
            width={"w-[240px]"}
            height={"h-[48px]"}
            rounded={"rounded-[40px]"}
          />
        </div>
      </div>
    </div>
  );
}
