import React, { useState } from "react";
import styles from "./LoginSignup.module.css";
import Kakao from "../assets/kakao.png";
import Google from "../assets/google.png";
import Logo from "../assets/logo.png";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "잘못된 이메일 형식입니다.";
  };

  const validatePassword = (password) => {
    return password.length >= 8 ? "" : "비밀번호는 8자 이상 입력해주세요.";
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword ? "" : "비밀번호가 일치하지 않습니다.";
  };

  const handleBlur = (field) => {
    setErrors((prev) => ({
      ...prev,
      [field]:
        field === "email"
          ? validateEmail(formData.email)
          : field === "password"
          ? validatePassword(formData.password)
          : validateConfirmPassword(
              formData.password,
              formData.confirmPassword
            ),
    }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const isFormValid =
    formData.email &&
    formData.nickname &&
    formData.password &&
    formData.confirmPassword &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword;

  return (
    <div className={styles.login}>
      <div className={`${styles.login_wrap} ${styles.signup}`}>
        <div className={styles.logo}>
          <a href="/" id="PM">
            <img src={Logo} alt="판다마켓 로고" /> 판다마켓
          </a>
        </div>

        <label className={styles.stress}>이메일</label>
        <input
          type="email"
          className={styles.input}
          placeholder="이메일을 입력해주세요"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
        />
        <p className={styles.error_message}>{errors.email}</p>

        <label className={styles.stress}>닉네임</label>
        <input
          type="text"
          className={styles.input}
          placeholder="닉네임을 입력해주세요"
          value={formData.nickname}
          onChange={(e) => handleChange("nickname", e.target.value)}
        />

        <label className={styles.stress}>비밀번호</label>
        <div className={styles.password_container}>
          <input
            type={visibility.password ? "text" : "password"}
            className={styles.input}
            placeholder="비밀번호를 입력해주세요"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
          />
          <span
            className={`material-symbols-outlined ${styles.toggle_password}`}
            onClick={() =>
              setVisibility((prev) => ({ ...prev, password: !prev.password }))
            }
          >
            {visibility.password ? "visibility" : "visibility_off"}
          </span>
        </div>
        <p className={styles.error_message}>{errors.password}</p>

        <label className={styles.stress}>비밀번호 확인</label>
        <div className={styles.password_container}>
          <input
            type={visibility.confirmPassword ? "text" : "password"}
            className={styles.input}
            placeholder="비밀번호를 다시 입력해주세요"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            onBlur={() => handleBlur("confirmPassword")}
          />
          <span
            className={`material-symbols-outlined ${styles.toggle_password}`}
            onClick={() =>
              setVisibility((prev) => ({
                ...prev,
                confirmPassword: !prev.confirmPassword,
              }))
            }
          >
            {visibility.confirmPassword ? "visibility" : "visibility_off"}
          </span>
        </div>
        <p className={styles.error_message}>{errors.confirmPassword}</p>

        <button
          className={`${styles.btnSignup} ${isFormValid ? styles.active : ""}`}
          disabled={!isFormValid}
          type="submit"
        >
          회원가입
        </button>

        <div className={styles.emailLogin}>
          <div className={styles.emailLogin_wrap}>
            <p>간편 로그인하기</p>
            <div className={styles.loginImg}>
              <a href="https://www.google.com">
                <img src={Google} alt="Google Login" />
              </a>
              <a href="https://www.kakaocorp.com/page/">
                <img src={Kakao} alt="Kakao Login" />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.crossLink}>
          이미 계정이 있으신가요? <a href="/login">로그인</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
