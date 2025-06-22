import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, FlexContainer, SectionTitle } from "../../styles/CommonStyles";
import styled from "styled-components";
import InputItem from "../../components/UI/InputItem";
import TagInput from "../../components/UI/TagInput";
import { addProduct } from "../../api/products";
import TextareaItem from "../../components/UI/TextareaItem";
import Button from "../../components/UI/Button";
import ImageUpload from "../../components/UI/ImageUpload";
import type { NewProduct } from '../../types';

const TitleSection = styled(FlexContainer)`
  margin-bottom: 16px;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    gap: 24px;
  }
`;


// 에러 상태 타입 정의
interface Errors {
  name?: string;
  description?: string;
  price?: string;
}

function AddItemPage() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();

  const validateName = (value: string) => {
    if (value.length < 2 || value.length > 10) {
      setErrors((prev) => ({
        ...prev,
        name: "2자 이상 10자 이내로 입력해주세요",
      }));
    } else {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const validateDescription = (value: string) => {
    if (value.length < 10) {
      setErrors((prev) => ({
        ...prev,
        description: "10자 이상 입력해주세요.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  const validatePrice = (value: string) => {
    if (!/^\d+$/.test(value)) {
      setErrors((prev) => ({ ...prev, price: "숫자로 입력해주세요." }));
    } else {
      setErrors((prev) => ({ ...prev, price: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 에러가 있으면 제출 막기
    if (Object.values(errors).some((msg) => msg !== undefined)) {
      return;
    }

    // 필수 입력 값 체크 추가 (빈값 허용 방지)
    if (!name || !description || !price || tags.length === 0) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    const productData: NewProduct = {
      name,
      description,
      price: Number(price),
      tags,
      images,
    };

    try {
      const result = await addProduct(productData);
      navigate(`/items/${result.id}`);
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("상품 등록에 실패했습니다.");
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TitleSection>
          <SectionTitle>상품 등록하기</SectionTitle>
          <Button
            type="submit"
            disabled={
              !name ||
              !description ||
              !price ||
              !tags.length ||
              Object.values(errors).some((msg) => msg !== undefined)
            }
          >
            등록
          </Button>
        </TitleSection>

        <InputSection>
          <ImageUpload
            id="images"
            label="상품 이미지"
            value={images}
            onChange={(newImages: string[]) => setImages(newImages)}
          />

          <InputItem
            id="name"
            label="상품명"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
              validateName(e.target.value);
            }}
            placeholder="상품명을 입력해 주세요"
            error={errors.name}
          />

          <TextareaItem
            id="description"
            label="상품 소개"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(e.target.value);
              validateDescription(e.target.value);
            }}
            placeholder="상품 소개를 입력해 주세요"
            error={errors.description}
          />

          <InputItem
            id="price"
            label="판매 가격"
            value={price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPrice(e.target.value);
              validatePrice(e.target.value);
            }}
            placeholder="판매 가격을 입력해 주세요"
            error={errors.price}
          />

          <TagInput value={tags} onChange={(newTags: string[]) => setTags(newTags)} />
        </InputSection>
      </form>
    </Container>
  );
}

export default AddItemPage;
