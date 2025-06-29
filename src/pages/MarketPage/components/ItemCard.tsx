import styled from "styled-components";
import SafeImage from "../../ItemDetailPage/components/SafeImage";
import HeartIcon from "../../../assets/images/icons/ic_heart.svg?react";
import type { ProductItem } from "../../../types";


const StyledSafeImage = styled(SafeImage)`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 16px;
`;

interface ItemCardProps {
  item: ProductItem;
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="itemCard">
      <StyledSafeImage
        src={item.images[0]}
        alt={`${item.name} 상품 대표 사진`}
      />
      <div className="itemSummary">
        <h2 className="itemName">{item.name}</h2>
        <p className="itemPrice">{item.price.toLocaleString()}원</p>
        <div className="favoriteCount">
          <HeartIcon />
          {item.favoriteCount}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
