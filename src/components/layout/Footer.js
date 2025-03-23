import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_wrap}>
        <div>&copy; Codeit - 2024</div>
        <div>
          <a href="/privacy">Privacy Policy&nbsp;&nbsp;</a>
          <a href="/FAQ">FAQ</a>
        </div>
        <div className={styles.socialIcons}>
          <a href="https://www.facebook.com/">
            <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
          </a>
          <a href="https://x.com/">
            <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
          </a>
          <a href="https://www.youtube.com/">
            <FontAwesomeIcon icon={faYoutube} className={styles.icon} />
          </a>
          <a href="https://www.instagram.com/">
            <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
