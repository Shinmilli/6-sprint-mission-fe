import styles from "./Nav.module.css";
import { Link, NavLink } from "react-router-dom";
import logoImg from "../../assets/logo.png"; // 로고 이미지 경로 수정

// const getLinkStyle = ({ isActive }) => ({
//   textDecoration: isActive ? "underline" : "none",
//   fontWeight: isActive ? "bold" : "normal",
// });

function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav_wrap}>
        <div className={styles.nav_container}>
          <Link to="/" id={styles.PM}>
            <img src={logoImg} alt="판다마켓 로고" />
            판다마켓
          </Link>
          <a href="#" className={styles.navlist}>
            자유게시판
          </a>
          <Link to="items" className={styles.navlist}>
            중고마켓
          </Link>
        </div>
        <NavLink to="/login" id={styles.login}>
          로그인
        </NavLink>
      </div>
    </nav>
  );
}

export default Nav;
