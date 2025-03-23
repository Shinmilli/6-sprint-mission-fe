import { useEffect, useState } from "react";
import ProductsList from "../components/util/ProductList.js";
import Pagination from "../components/util/Pagination.js";
import useGetDeviceType from "../hooks/useGetDeviceType.js";
import { getProducts } from "../api.js";

const Items = () => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(null);
  const [params, setParams] = useState({
    offset: 1,
    limit: null,
    orderBy: "recent",
    keyword: "",
  });
  const [device, setDevice] = useGetDeviceType();

  // 반응형 리퀘스트 보내기
  useEffect(() => {
    if (device) {
      setParams((prevParams) => ({
        ...prevParams,
        limit: device === "desktop" ? 10 : device === "tablet" ? 6 : 4,
      }));
    }
  }, [device]);

  // 렌더링(판매중인 상품)
  useEffect(() => {
    if (!params.limit) return;
    productsLoad(params);
  }, [params]);

  const productsLoad = async (params) => {
    const { list, totalCount } = await getProducts(params);
    setProducts(list);
    setTotalCount(totalCount);
  };

  // 렌더링(정렬 선택)
  const sortLoad = (orderBy) => {
    if (params.orderBy === orderBy) return;
    setParams((prevParams) => ({ ...prevParams, offset: 1, orderBy }));
  };

  // 렌더링(검색)
  const searchLoad = (keyword) => {
    if (params.keyword === keyword) return;
    setParams((prevParams) => ({ ...prevParams, offset: 1, keyword }));
  };

  // 렌더링(현재 페이지 변경)
  const pageLoad = (offset) => {
    if (params.offset === offset) return;
    setParams((prevParams) => ({ ...prevParams, offset }));
  };

  return (
    <div>
      <ProductsList products={products} />
      <Pagination
        device={device}
        pageLoad={pageLoad}
        params={params}
        totalCount={totalCount}
      />
    </div>
  );
};

export default Items;
