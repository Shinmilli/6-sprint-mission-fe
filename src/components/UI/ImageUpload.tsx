import type { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import DeleteButton from './DeleteButton';
import Label from './Label';
import PlusIcon from '../../assets/images/icons/ic_plus.svg?react';
import { uploadImage } from '../../api/images';

// ✅ 1. Props 타입 정의
interface ImageUploadProps {
  id: string;
  label?: string;
  value?: string[];
  onChange: (urls: string[]) => void;
}

const ImageUploadContainer = styled.div`
  display: flex;
  gap: 8px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    gap: 18px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    gap: 24px;
  }
`;

const squareStyles = css`
  width: calc(50% - 4px);
  max-width: 200px;
  aspect-ratio: 1 / 1;
  border-radius: 12px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    width: 162px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    width: 282px;
  }
`;

// ✅ 2. src를 props로 받을 수 있게 설정
interface ImagePreviewProps {
  $src: string;
}

const ImagePreview = styled.div<ImagePreviewProps>`
  background-image: url('${({ $src }) => $src}');
  background-size: cover;
  background-position: center;
  position: relative;
  ${squareStyles}
`;

const UploadButton = styled.label`
  background-color: ${({ theme }) => theme.colors.gray[1]};
  color: ${({ theme }) => theme.colors.gray[0]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[50]};
  }

  ${squareStyles}
`;

const DeleteButtonWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

/**
 * 이미지를 서버에 최대 3개까지 업로드하고,
 * 서버에서 받은 이미지 주소를 가지고 값을 변경하는 인풋입니다.
 * 이미지를 업로드하거나 제거할 때마다 배열 값으로 `onChange()`를 실행합니다.
 */
function ImageUpload({ id, label, value = [], onChange }: ImageUploadProps) {
  // ✅ 3. event 타입 명시
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const uploadedUrl = await uploadImage(file);
      onChange([...value, uploadedUrl]);
    }
  };

  // ✅ 4. idx 타입 명시
  const handleDelete = (idx: number) => {
    const nextValue = [...value.slice(0, idx), ...value.slice(idx + 1)];
    onChange(nextValue);
  };

  const uploadEnabled = value.length < 3;

  return (
    <div>
      {label && <Label>{label}</Label>}
      <ImageUploadContainer>
        {uploadEnabled && (
          <>
            <UploadButton htmlFor={id}>
              <PlusIcon />
              이미지 등록
            </UploadButton>
            <HiddenFileInput
              id={id}
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
          </>
        )}
        {value.map((url, idx) => (
          <ImagePreview key={idx} $src={url}>
            <DeleteButtonWrapper>
              <DeleteButton
                onClick={() => handleDelete(idx)}
                label="이미지 파일"
              />
            </DeleteButtonWrapper>
          </ImagePreview>
        ))}
      </ImageUploadContainer>
    </div>
  );
}

export default ImageUpload;
