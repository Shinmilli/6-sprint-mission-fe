import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  createArticle,
  updateArticle,
  getArticleDetail,
} from "@/api/articleApi";

import styled from "styled-components";
import {
  Button,
  Container,
  SectionTitle,
  SpaceBetween,
} from "@/styles/CommonStyles";
import InputItem from "@/components/ui/InputItem";

const TitleSection = styled(SpaceBetween)`
  margin-bottom: 24px;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    gap: 24px;
  }
`;

// 참고: 게시글 작성/수정 페이지로, id가 존재하면 수정 모드, 없으면 작성 모드로 동작해요.

const AddArticlePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // id가 있을 때만, 즉 수정 모드일 때 서버에서 기존 게시글 데이터를 가져옵니다.
    if (id) {
      const fetchArticle = async () => {
        try {
          const article = await getArticleDetail(id);
          setTitle(article.title);
          setContent(article.content);
        } catch (error) {
          console.error("게시글을 불러오는 중 오류 발생:", error);
        }
      };
      fetchArticle();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // 게시글 수정 API 호출
        await updateArticle({ id, title, content });
        // 수정 후 해당 게시글 상세 페이지로 이동
        router.push(`/board/${id}`);
      } else {
        // 새로운 게시글 생성 API 호출
        const newArticle = await createArticle({ title, content });
        router.push(`/board/${newArticle.id}`); // 생성 후 해당 게시글로 이동
      }
    } catch (error) {
      console.error("게시글 처리 실패:", error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TitleSection>
          {/* id 유무에 따라 "게시글 쓰기" 또는 "게시글 수정"으로 타이틀을 변경 */}
          <SectionTitle>{id ? "게시글 수정" : "게시글 쓰기"}</SectionTitle>
          {/* 제출 버튼도 작성/수정 모드에 따라 텍스트 변경 */}
          <Button type="submit" disabled={!title.trim() || !content.trim()}>
            {id ? "수정" : "등록"}
          </Button>
        </TitleSection>

        <InputSection>
          <InputItem
            id="title"
            label="*제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
          />
          <InputItem
            id="content"
            label="*내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해 주세요"
            isTextArea
          />
        </InputSection>
      </form>
    </Container>
  );
};

export default AddArticlePage;
