import { useState, useEffect } from "react";
import { getItems } from "../api";
import { GetBestList } from "../api";
import ProductList from "../components/util/ProductList";
import styles from "./Items.module.css";

function Items() {
  // 상태 변수
  const [order, setOrder] = useState("createdAt"); // 정렬 기준
  const [products, setProducts] = useState([]); // 상품 리스트
  const [bestProducts, setBestProducts] = useState([]); // 베스트 상품 리스트
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [totalCount, setTotalCount] = useState(0); // 전체 상품 개수
  const itemsPerPage = 10; // 한 페이지에 표시할 상품 개수
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [search, setSearch] = useState(""); // 검색어

  // 🔹 정렬 버튼 핸들러 (정렬 변경 시 페이지 1로 리셋)
  const handleNewestClick = () => {
    setOrder("createdAt");
    setPage(1);
  };

  const handleFavoriteClick = () => {
    setOrder("favoriteCount");
    setPage(1);
  };

  // 🔹 데이터 불러오기 (정렬, 검색, 페이지 반영)
  const handleLoad = async (
    pageNum = 1,
    orderType = "createdAt",
    searchQuery = ""
  ) => {
    setIsLoading(true);
    try {
      const result = await getItems({
        order: orderType, // 🔹 API 요청 시 정렬 기준을 반영
        limit: itemsPerPage,
        search: searchQuery,
        page: pageNum,
      });

      const { list, totalCount } = result;
      if (!list) throw new Error("잘못된 응답 형식입니다.");

      setProducts(list);
      setTotalCount(totalCount);
    } catch (error) {
      setLoadingError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 베스트 상품 데이터 불러오기
  useEffect(() => {
    const loadBestProducts = async () => {
      try {
        const bestList = await GetBestList({ pageSize: 4 });
        setBestProducts(bestList.list || []);
      } catch (error) {
        console.error("베스트 상품 불러오기 실패", error);
      }
    };
    loadBestProducts();
  }, []);

  // 🔹 페이지네이션 버튼 클릭 시
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // 🔹 검색 폼 제출 시 실행
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newSearch = e.target["search"].value;

    // 🔹 search 상태가 먼저 업데이트된 후 page 변경
    setSearch(newSearch);
  };
  // 🔹 search가 변경되면 페이지를 1로 초기화
  useEffect(() => {
    setPage(1);
  }, [search]);

  // 🔹 useEffect: 페이지, 정렬, 검색이 바뀔 때마다 실행
  useEffect(() => {
    handleLoad(page, order, search);
  }, [page, order, search]);

  const sortedProducts = (products || []).sort((a, b) => b[order] - a[order]);

  // 🔹 총 페이지 수 계산
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className={styles.item_wrap}>
      <div className={styles.best}>
        <h1>베스트 상품</h1>
        <div className={styles.best_item_wrap}>
          <ProductList products={bestProducts} />
        </div>
      </div>

      <div className={styles.sale}>
        <div className={styles.sale_wrap}>
          <div className={styles.sale_nav}>
            <h1>판매 중인 상품</h1>
            <div className={styles.sale_function_container}>
              <form onSubmit={handleSearchSubmit}>
                <input
                  className={styles.sale_search_bar}
                  name="search"
                  placeholder="검색할 상품을 입력하세요"
                />
                <button className={styles.upload_Btn} type="submit">
                  검색
                </button>
              </form>
              <button
                onClick={handleNewestClick}
                className={`${styles.sale_list_Btn} ${
                  order === "createdAt" ? styles.active : ""
                }`}
              >
                최신순
              </button>
              <button
                onClick={handleFavoriteClick}
                className={`${styles.sale_list_Btn} ${
                  order === "favoriteCount" ? styles.active : ""
                }`}
              >
                좋아요순
              </button>
            </div>
          </div>

          <div className={styles.sale_item_wrap}>
            <ProductList products={sortedProducts} />
          </div>

          {/* 페이지네이션 추가 */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          {loadingError && (
            <p className={styles.error}>{loadingError.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// 페이지네이션 컴포넌트 (5개씩 끊어서 표시)
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageSize = 5; // 한 번에 표시할 페이지 수
  const currentRangeStart =
    Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
  const currentRangeEnd = Math.min(
    currentRangeStart + pageSize - 1,
    totalPages
  );

  return (
    <div className={styles.page_wrap}>
      {/* 이전 5개 페이지 버튼 */}
      {currentRangeStart > 1 && (
        <button
          className={styles.page_btn}
          onClick={() => onPageChange(currentRangeStart - 1)}
        >
          &laquo;
        </button>
      )}

      {/* 개별 페이지 버튼 */}
      {[...Array(currentRangeEnd - currentRangeStart + 1)].map((_, index) => {
        const pageNum = currentRangeStart + index;
        return (
          <button
            key={pageNum}
            className={`${styles.page_btn} ${
              currentPage === pageNum ? styles.activePage : ""
            }`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}

      {/* 다음 5개 페이지 버튼 */}
      {currentRangeEnd < totalPages && (
        <button
          className={styles.page_btn}
          onClick={() => onPageChange(currentRangeEnd + 1)}
        >
          &raquo;
        </button>
      )}
    </div>
  );
};

export default Items;
