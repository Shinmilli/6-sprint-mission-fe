import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  LineDivider,
  SectionHeader,
  SectionTitle,
  StyledLink,
} from "@/styles/CommonStyles";
import { useRouter } from "next/router";
import SearchBar from "@/components/ui/SearchBar";
import DropdownMenu from "@/components/ui/DropdownMenu";
import EmptyState from "@/components/ui/EmptyState";
import ArticleInfo from "@/components/board/ArticleInfo";
import LikeCountDisplay from "@/components/ui/LikeCountDisplay";
import Image from "next/image";
import {
  ArticleInfoWrapper,
  ArticleThumbnail,
  ArticleTitle,
  ImageWrapper,
  MainContent,
} from "@/styles/BoardStyles";

// ArticleItem 컴포넌트
const ItemContainer = styled.a``;

const ArticleItem = ({ article }) => {
  return (
    <>
      <ItemContainer href={`/board/${article.id}`}>
        <MainContent>
          <ArticleTitle>{article.title}</ArticleTitle>
          {article.image && (
            <ArticleThumbnail>
              {/* Next Image의 width, height을 설정해줄 것이 아니라면 부모 div 내에서 fill, objectFit 설정으로 비율 유지하면서 유연하게 크기 조정 */}
              {/* 프로젝트 내에 있는 이미지 파일을 사용하는 게 아니라면 next.config.mjs에 이미지 주소 설정 필요 */}
              <ImageWrapper>
                <Image
                  fill
                  src={article.image}
                  alt={`${article.id}번 게시글 이미지`}
                  style={{ objectFit: "contain" }}
                />
              </ImageWrapper>
            </ArticleThumbnail>
          )}
        </MainContent>

        <ArticleInfoWrapper>
          <ArticleInfo article={article} />
          <LikeCountDisplay count={article.likeCount} iconWidth={24} gap={8} />
        </ArticleInfoWrapper>
      </ItemContainer>

      <LineDivider $margin="24px 0" />
    </>
  );
};

// 게시글 리스트 컴포넌트
const AddArticleLink = styled(StyledLink)``;

const AllArticlesSection = ({ initialArticles, hasNext, nextCursor }) => {
  const [orderBy, setOrderBy] = useState("recent");
  const [articles, setArticles] = useState(initialArticles);
  const [cursor, setCursor] = useState(nextCursor);
  const [hasMore, setHasMore] = useState(hasNext);

  const router = useRouter();
  const word = router.query.q || "";

  // 정렬 옵션 변경 핸들러
  const handleSortSelection = (sortOption) => {
    setOrderBy(sortOption);
  };

  // 검색어 입력 핸들러
  const handleSearch = (searchKeyword) => {
    const query = { ...router.query };
    if (searchKeyword.trim()) {
      query.q = searchKeyword;
    } else {
      delete query.q;
    }
    router.replace({
      pathname: router.pathname,
      query,
    });
  };

  // 게시글 가져오기
  useEffect(() => {
    const fetchArticles = async () => {
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles?orderBy=${orderBy}&cursor=0&take=10`;
      if (word.trim()) {
        // encodeURIComponent는 공백이나 특수 문자 등 URL에 포함될 수 없는 문자열을 안전하게 전달할 수 있도록 인코딩하는 자바스크립트 함수예요.
        url += `&word=${encodeURIComponent(word)}`;
      }
      const response = await fetch(url);

      const data = await response.json();

      setArticles(data.data || []); // 새로운 데이터 설정
      setCursor(data.nextCursor); // 다음 커서 설정
      setHasMore(data.hasNext); // 다음 페이지 여부 설정
    };

    fetchArticles();
  }, [orderBy, word]);

  return (
    <div>
      <SectionHeader>
        <SectionTitle>게시글</SectionTitle>
        {/* 참고: 임의로 /addArticle 이라는 pathname으로 게시글 작성 페이지를 추가했어요 */}
        <AddArticleLink href="/addArticle">글쓰기</AddArticleLink>
      </SectionHeader>

      <SectionHeader>
        <SearchBar onSearch={handleSearch} />
        <DropdownMenu
          onSortSelection={handleSortSelection}
          sortOptions={[{ key: "recent", label: "최신순" }]}
        />
      </SectionHeader>

      {articles.length > 0
        ? articles.map((article) => (
            <ArticleItem key={`article-${article.id}`} article={article} />
          ))
        : // 참고: 요구사항에는 없었지만 항상 Empty State UI 구현하는 걸 잊지 마세요! Empty State을 재사용 가능한 컴포넌트로 만들었어요.
          // 키워드가 입력되지 않은 상태에서 검색 시 Empty State이 보이지 않도록 조건 추가
          word && <EmptyState text={`'${word}'로 검색된 결과가 없어요.`} />}
    </div>
  );
};

export default AllArticlesSection;
