import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import styled, { css } from "styled-components";
import Spinner from "../../assets/images/ui/spinner.svg?react";

// 1. Button & Link 공통 스타일용 props 분리
interface ButtonStyleProps {
  $pill?: boolean;
  $appearance?: "primary" | "secondary";
}

// 2. 스타일 정의 (ButtonStyleProps 기준)
export const buttonStyle = css<ButtonStyleProps>`
  background-color: ${({ theme }) => theme.colors.blue[0]};
  color: #ffffff;
  border-radius: ${({ $pill }) => ($pill ? "999px" : "8px")};
  padding: 14px 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue[1]};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.blue[2]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[0]};
    cursor: default;
    pointer-events: none;
  }

  ${({ $appearance, theme }) =>
    $appearance === "secondary" &&
    css`
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors.blue[0]};
      color: ${theme.colors.blue[0]};
      &:focus,
      &:hover,
      &:disabled {
        color: ${theme.colors.white};
      }
    `}
`;

// 3. Button 컴포넌트 정의
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyleProps {
  isLoading?: boolean;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
function BaseButton({ isLoading, children, onClick, ...props }: ButtonProps) {
  return <button onClick={onClick} {...props}>{isLoading ? <Spinner /> : children}</button>;
}
const Button = styled(BaseButton)<ButtonProps>`
  ${buttonStyle}
`;

export default Button;
