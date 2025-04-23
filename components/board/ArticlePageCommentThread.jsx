import { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import EmptyState from "@/components/ui/EmptyState";
import CommentItem from "@/components/thread/CommentItem";
import { getArticleComments } from "@/api/articleApi";

const ThreadContainer = styled.div`
  margin-bottom: 40px;
`;

const ArticlePageCommentThread = ({ articleId, comments, onComments }) => {
  const [cursor, setCursor] = useState(null); // 다음 커서 값
  const [hasNext, setHasNext] = useState(true); // 다음 페이지가 있는지 여부
  const [isFetching, setIsFetching] = useState(false); // 현재 댓글을 가져오는 중인지 상태

  const observer = useRef(); // 무한 스크롤용 observer ref

  // 댓글 삭제 핸들러
  const handleDeleteComment = (commentId) => {
    onComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  // 댓글 업데이트 핸들러
  const handleUpdateComment = (commentId, updatedComment) => {
    onComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, content: updatedComment }
          : comment
      )
    );
  };
  // 댓글을 가져오는 함수
  const fetchComments = async () => {
    if (!hasNext || isFetching) return; // 이미 fetching 중이거나 더 가져올 댓글이 없으면 종료

    setIsFetching(true); // fetching 상태를 true로 설정

    try {
      const response = await getArticleComments({
        articleId,
        take: 10,
        cursor: cursor ? cursor : undefined,
      });

      // 중복 추가 방지: 이전 상태와 합칠 때 중복이 되지 않도록 처리
      onComments((prevComments) => {
        const newComments = response.data.filter(
          (newComment) =>
            !prevComments.some((comment) => comment.id === newComment.id)
        );
        return [...prevComments, ...newComments];
      });

      setHasNext(response.hasNext); // 더 가져올 댓글이 있는지 여부 업데이트
      if (response.hasNext) {
        setCursor(response.nextCursor); // 다음 커서를 업데이트
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsFetching(false); // fetching 상태 해제
    }
  };

  // 무한 스크롤을 위한 IntersectionObserver 설정
  const lastCommentRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext && !isFetching) {
          fetchComments();
        }
      });

      if (node) observer.current.observe(node);
    },
    [cursor, hasNext, isFetching]
  );

  // 초기 로딩 시 첫 번째 댓글을 가져옴
  useEffect(() => {
    onComments([]); // 초기화 (기존 댓글 초기화)
    fetchComments();
  }, [articleId]);

  // 댓글이 없는 경우 빈 상태 표시
  if (comments.length === 0) {
    return (
      <EmptyState text={`아직 댓글이 없어요,\n지금 댓글을 달아 보세요!`} />
    );
  } else {
    return (
      <ThreadContainer>
        {comments.map((item, index) => {
          if (index === comments.length - 1) {
            // 마지막 댓글에 ref 연결
            return (
              <div ref={lastCommentRef} key={`comment-${item.id}`}>
                <CommentItem
                  item={item}
                  onDeleteComment={handleDeleteComment}
                  onUpdateComment={handleUpdateComment}
                />
              </div>
            );
          } else {
            return (
              <CommentItem
                key={`comment-${item.id}`}
                item={item}
                onDeleteComment={handleDeleteComment}
                onUpdateComment={handleUpdateComment}
              />
            );
          }
        })}
      </ThreadContainer>
    );
  }
};

export default ArticlePageCommentThread;
