import { useState } from "react";
import styled from "styled-components";
import { formatUpdatedAt } from "@/utils/dateUtils";
import DefaultProfileImage from "@/public/images/ui/ic_profile.svg";
import { TextArea } from "@/styles/CommonStyles";
import DropdownSeemore from "@/components/ui/DropdownSeemore";
import { updateComment, deleteComment } from "@/api/commentApi";
import { CommentInputSection, PostCommentButton } from "@/styles/CommentStyles";
import { LineDivider } from "@/styles/CommonStyles";
import Image from "next/image";

const CommentContainer = styled.div`
  padding: 24px 0;
  position: relative;
`;

const SeeMoreButton = styled.button`
  position: absolute;
  right: 0;
`;

const CommentContent = styled.p`
  font-size: 16px;
  line-height: 140%;
  margin-bottom: 24px;
`;

const AuthorProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserProfileImageWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

const Username = styled.p`
  color: var(--gray-600);
  font-size: 14px;
  margin-bottom: 4px;
`;

const Timestamp = styled.p`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 12px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px; /* 버튼 간 간격을 주기 위해 추가 */
`;

const CommentItem = ({ item, onDeleteComment, onUpdateComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(item.content); // editedContent 상태 추가

  const authorInfo = item.writer;
  const formattedTimestamp = formatUpdatedAt(item.createdAt);

  const handleSelection = async (sortOption) => {
    if (sortOption === "edit") {
      setIsEditing(true);
    } else if (sortOption === "delete") {
      try {
        await deleteComment(item.id);
        onDeleteComment(item.id); // 삭제 후 부모 컴포넌트에서 상태 업데이트
      } catch (error) {
        console.error("댓글 삭제 실패:", error);
      }
    }
  };

  const handleSaveEdit = async () => {
    try {
      const updatedComment = await updateComment({
        commentId: item.id,
        content: editedContent,
      });
      console.log("updatedComment", updatedComment.content);
      onUpdateComment(item.id, updatedComment.content); // 부모 컴포넌트에서 상태 업데이트
      setIsEditing(false);
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  const handleInputChange = (e) => {
    setEditedContent(e.target.value); // 입력된 값으로 상태 업데이트
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(item.content); // 수정 취소 시 원래 댓글 내용으로 복구
  };

  return (
    <>
      <CommentContainer>
        {/* 참고: 더보기 버튼 기능은 추후 요구사항에 따라 추가 예정 */}
        {!isEditing ? (
          <>
            <SeeMoreButton as="div">
              <DropdownSeemore
                onSelection={handleSelection}
                options={[
                  { key: "edit", label: "수정하기" },
                  { key: "delete", label: "삭제하기" },
                ]}
              />
            </SeeMoreButton>

            <CommentContent>{item.content}</CommentContent>
          </>
        ) : (
          <>
            <CommentInputSection>
              <TextArea value={editedContent} onChange={handleInputChange} />
            </CommentInputSection>
          </>
        )}
        <FlexContainer>
          <AuthorProfile>
            <>
              {authorInfo?.image ? (
                <UserProfileImageWrapper>
                  <Image
                    src={authorInfo?.image}
                    alt={`${authorInfo?.nickname}님의 프로필 사진`}
                    width={40}
                    height={40}
                    objectFit="cover"
                  />
                </UserProfileImageWrapper>
              ) : (
                <UserProfileImageWrapper>
                  <DefaultProfileImage
                    aria-label={`${authorInfo?.nickname}님의 프로필 사진`}
                  />
                </UserProfileImageWrapper>
              )}
              <div>
                <Username>
                  {authorInfo?.nickname ? authorInfo?.nickname : "닉네임"}
                </Username>
                <Timestamp>{formattedTimestamp}</Timestamp>
              </div>
            </>
          </AuthorProfile>

          {isEditing && (
            <ButtonGroup>
              <button onClick={handleCancelEdit}>취소</button>
              <PostCommentButton onClick={handleSaveEdit}>
                수정 완료
              </PostCommentButton>
            </ButtonGroup>
          )}
        </FlexContainer>
      </CommentContainer>

      <LineDivider $margin="0" />
    </>
  );
};

export default CommentItem;
