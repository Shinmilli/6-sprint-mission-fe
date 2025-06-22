import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import styled, { css } from "styled-components";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

interface InputStyleProps {
  $error?: boolean;
}

export const inputStyle = css<InputStyleProps>`
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.gray[1]};
  color: ${({ theme }) => theme.colors.black};
  border-radius: 12px;
  font-size: 16px;
  line-height: 24px;
  width: 100%;
  outline: none;
  border: 1px solid transparent;

  ${({ $error, theme }) =>
    $error &&
    css`
      border-color: ${theme.colors.red[0]};
    `}

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[0]};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.blue[0]};
  }
`;

export const InputField = styled.input<InputStyleProps>`
  ${inputStyle}
`;

interface InputItemProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: string | boolean;
  register?: UseFormRegisterReturn;
}

function InputItem({
  id,
  label,
  error,
  register,
  ...inputProps
}: InputItemProps) {
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <InputField
        id={id}
        $error={!!error}
        {...inputProps}
        {...(register ?? {})} // register가 없으면 빈 객체로 대체
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

export default InputItem;
