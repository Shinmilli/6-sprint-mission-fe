//import React from "react";
import styled from "styled-components";
import CloseIcon from "../../assets/images/icons/ic_x.svg?react";

interface DeleteButtonProps {
  onClick: () => void;
  label: string;
}

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.gray[0]};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue[0]};
  }
`;

function DeleteButton({ onClick, label }: DeleteButtonProps) {
  return (
    <Button type="button" aria-label={`${label} 삭제`} onClick={onClick}>
      <CloseIcon />
    </Button>
  );
}

export default DeleteButton;
