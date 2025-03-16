// validation.js

// 이메일 유효성 검사
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "이메일을 입력해주세요.";
  if (!emailRegex.test(email)) return "잘못된 이메일 형식입니다.";
  return "";
};

// 비밀번호 유효성 검사
export const validatePassword = (password) => {
  if (!password) return "비밀번호를 입력해주세요.";
  if (password.length < 8) return "비밀번호를 8자 이상 입력해주세요.";
  return "";
};

// 비밀번호 확인 유효성 검사
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "비밀번호를 재확인 해주세요.";
  if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다.";
  return "";
};

// 전체 폼 유효성 검사
export const isFormValid = ({
  email,
  nickname,
  password,
  confirmPassword,
  errors,
}) => {
  return (
    email &&
    nickname &&
    password &&
    confirmPassword &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword
  );
};

// 비밀번호 표시/숨기기 토글 함수
export const togglePasswordVisibility = (setter) => {
  setter((prev) => !prev);
};
