import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import CommentThread from "./CommentThread";
import CommentForm from "./CommentForm";
import { addProductComment } from "../../../api/products";

interface ItemCommentSectionProps {
  productId: string;
}

const CommentInputSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
`;

const ItemCommentSection = ({ productId }: ItemCommentSectionProps) => {
  const queryClient = useQueryClient();

  const handleCommentFormSubmit = async (content: string) => {
    await addProductComment(productId, { content });
    queryClient.invalidateQueries({
      queryKey: ["products", productId, "comments"],
    });
  };

  return (
    <>
      <CommentInputSection>
        <SectionTitle>문의하기</SectionTitle>
        <CommentForm defaultValue="" onSubmit={handleCommentFormSubmit} onCancel={() => {}}/>
      </CommentInputSection>

      <CommentThread productId={productId} />
    </>
  );
};

export default ItemCommentSection;
