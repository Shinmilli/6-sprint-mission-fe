import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import styles from "./Items.module.css";
import Item from "../assets/item_ex.png";

function Items() {
  const bestProducts = [
    {
      id: 1,
      title: "아이패드 미니 팝니다",
      price: 500000,
      likes: 240,
      image: Item,
    },
    {
      id: 2,
      title: "아이패드 미니 팝니다",
      price: 500000,
      likes: 240,
      image: Item,
    },
    {
      id: 3,
      title: "아이패드 미니 팝니다",
      price: 500000,
      likes: 240,
      image: Item,
    },
    {
      id: 4,
      title: "아이패드 미니 팝니다",
      price: 500000,
      likes: 240,
      image: Item,
    },
  ];

  const [saleProducts, setSaleProducts] = useState([
    { id: 1, title: "로봇 청소기", price: 1500000, likes: 240, image: Item },
    { id: 2, title: "로봇 청소기", price: 1500000, likes: 240, image: Item },
    { id: 3, title: "로봇 청소기", price: 1500000, likes: 240, image: Item },
    { id: 4, title: "로봇 청소기", price: 1500000, likes: 240, image: Item },
    { id: 5, title: "로봇 청소기", price: 1500000, likes: 240, image: Item },
  ]);

  const toggleLike = (id) => {
    setSaleProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, likes: product.likes + 1 } : product
      )
    );
  };

  return (
    <div className={styles.item_wrap}>
      <div className={styles.best}>
        <h1>베스트 상품</h1>
        <div className={styles.best_item_wrap}>
          {bestProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              toggleLike={toggleLike}
            />
          ))}
        </div>
      </div>

      <div className={styles.sale}>
        <div className={styles.sale_wrap}>
          <div className={styles.sale_nav}>
            <h1>판매 중인 상품</h1>
            <div className={styles.sale_function_container}>
              <div className={styles.sale_search_bar}>
                검색할 상품을 입력해주세요
              </div>
              <button className={styles.upload_Btn}>상품 등록하기</button>
              <button className={styles.sale_list_Btn}>최신순</button>
            </div>
          </div>
          <div className={styles.sale_item_wrap}>
            {saleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                toggleLike={toggleLike}
              />
            ))}
          </div>
        </div>
      </div>

      <Pagination />
    </div>
  );
}

const ProductCard = ({ product, toggleLike }) => {
  return (
    <div className={styles.sale_item_container}>
      <img
        src={product.image}
        alt={product.title}
        className={styles.item_image}
      />
      <p className={styles.title}>{product.title}</p>
      <p className={styles.price}>{product.price.toLocaleString()}원</p>
      <div className={styles.heart} onClick={() => toggleLike(product.id)}>
        <FontAwesomeIcon icon={faHeart} />
        <p className={styles.heart_number}>{product.likes}</p>
      </div>
    </div>
  );
};

const Pagination = () => {
  return (
    <div className={styles.page_wrap}>
      <div className={styles.left_btn}>&lt;</div>
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <button key={num} className={styles.page_btn}>
          {num}
        </button>
      ))}
      <div className={styles.right_btn}>&gt;</div>
    </div>
  );
};

export default Items;
