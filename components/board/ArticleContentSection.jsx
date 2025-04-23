import styled from "styled-components";
import { useRouter } from "next/router"; // 라우터 사용
import { FlexRowCentered, LineDivider } from "@/styles/CommonStyles";
import ArticleInfo from "@/components/board/ArticleInfo";
import DropdownSeemore from "@/components/ui/DropdownSeemore";
import LikeCountDisplay from "@/components/ui/LikeCountDisplay";
import { deleteArticle } from "@/api/articleApi";

const SectionContainer = styled.div`
  margin-bottom: 40px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    margin-bottom: 64px;
  }
`;

const ArticleHeaderContainer = styled.div`
  position: relative;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const ArticleInfoWrapper = styled(FlexRowCentered)`
  gap: 16px;
`;

const VerticalDivider = styled.div`
  border-left: 1px solid var(--gray-200);
  height: 24px;
`;

const Content = styled.p`
  font-size: 16px;
`;

const ArticleContentSection = ({ article }) => {
  // const [orderBy, setOrderBy] = useState("recent");
  const router = useRouter();

  // useState(() => {}, [orderBy]);

  // 수정, 삭제 핸들러 함수
  const handleSelection = async (sortOption) => {
    if (sortOption === "edit") {
      // 수정하기 페이지로 이동하면서 현재 게시글 정보를 쿼리 파라미터로 넘김
      router.push({
        pathname: "/addArticle",
        query: {
          id: article.id,
        },
      });
    } else if (sortOption === "delete") {
      try {
        await deleteArticle(article.id); // 삭제 API 호출
        // TODO: 삭제 후 로직 (예: 목록 페이지로 이동)
        router.push("/board");
      } catch (error) {
        console.error("게시글 삭제 실패:", error);
      } finally {
      }
    }
  };
  return (
    <SectionContainer>
      <ArticleHeaderContainer>
        <Title>{article.title}</Title>

        <DropdownSeemore
          onSelection={handleSelection}
          options={[
            { key: "edit", label: "수정하기" },
            { key: "delete", label: "삭제하기" },
          ]}
        />

        <ArticleInfoWrapper>
          <ArticleInfo article={article} />
          <VerticalDivider />
          <LikeCountDisplay
            className={"like-count-display"}
            count={"11"} // 임의값 처리
            iconWidth={24}
            gap={8}
          />
        </ArticleInfoWrapper>
      </ArticleHeaderContainer>

      <LineDivider />

      <Content>{article.content}</Content>
    </SectionContainer>
  );
};

export default ArticleContentSection;
