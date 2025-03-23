import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginSignup.module.css";
import Kakao from "../assets/kakao.png";
import Google from "../assets/google.png";
import Logo from "../assets/logo.png";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "이메일을 입력해주세요.";
    if (!emailRegex.test(email)) return "잘못된 이메일 형식입니다.";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "비밀번호를 입력해주세요.";
    if (password.length < 8) return "비밀번호를 8자 이상 입력해주세요.";
    return "";
  };

  const handleBlur = (field) => {
    setErrors((prev) => ({
      ...prev,
      [field]:
        field === "email"
          ? validateEmail(formData.email)
          : validatePassword(formData.password),
    }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Reset error message while typing
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      console.log("Logging in with:", formData);
      alert("로그인 성공!");
      navigate("/");
    } else {
      alert("이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login_wrap}>
        <div className={styles.logo}>
          <a href="/" id="PM">
            <img src={Logo} alt="판다마켓" /> 판다마켓
          </a>
        </div>

        <div className={styles.stress}>이메일</div>
        <input
          type="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          placeholder="이메일을 입력해주세요"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
        />
        {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}

        <div className={styles.stress}>비밀번호</div>
        <div className={styles.password_container}>
          <input
            type={isPasswordVisible ? "text" : "password"}
            className={`${styles.input} ${
              errors.password ? styles.inputError : ""
            }`}
            placeholder="비밀번호를 입력해주세요"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
          />
          <span
            className={`material-symbols-outlined ${styles.toggle_password}`}
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? "visibility" : "visibility_off"}
          </span>
        </div>
        {errors.password && (
          <p className={styles.errorMessage}>{errors.password}</p>
        )}

        <button
          className={`${styles.btnLogin} ${
            formData.email &&
            formData.password &&
            !errors.email &&
            !errors.password
              ? styles.active
              : ""
          }`}
          onClick={handleLogin}
          disabled={
            !formData.email ||
            !formData.password ||
            errors.email ||
            errors.password
          }
        >
          로그인
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
          판다마켓이 처음이신가요? <a href="/signup">회원가입</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
