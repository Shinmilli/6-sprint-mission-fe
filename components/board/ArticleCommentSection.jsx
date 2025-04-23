import { useState } from "react";
import { TextArea } from "@/styles/CommonStyles";
import ArticlePageCommentThread from "@/components/board/ArticlePageCommentThread";
import {
  CommentInputSection,
  CommentSectionTitle,
  PostCommentButton,
} from "@/styles/CommentStyles";
import { createComment } from "@/api/articleApi"; // 댓글 등록 API

const ArticleCommentSection = ({ articleId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // 입력값 변경 처리
  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  // 댓글 등록 처리
  const handlePostComment = async () => {
    if (!comment.trim()) return;

    try {
      // 댓글 등록 API 호출
      const newComment = await createComment({ articleId, content: comment });

      // 새로운 댓글 리스트에 추가
      setComments((prevComments) => [newComment, ...prevComments]);
      setComment(""); // 댓글 등록 후 입력란 초기화

      // 여기서 댓글 목록을 갱신할 수 있도록 로직 추가 가능
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    }
  };

  return (
    <>
      <CommentInputSection>
        <CommentSectionTitle>댓글 달기</CommentSectionTitle>

        <TextArea
          placeholder={"댓글을 입력해 주세요."}
          value={comment}
          onChange={handleInputChange}
        />

        <PostCommentButton
          onClick={handlePostComment}
          disabled={!comment.trim()} // 입력이 없으면 버튼 비활성화
        >
          등록
        </PostCommentButton>
      </CommentInputSection>

      <ArticlePageCommentThread
        articleId={articleId}
        comments={comments}
        onComments={setComments}
      />
    </>
  );
};

export default ArticleCommentSection;
